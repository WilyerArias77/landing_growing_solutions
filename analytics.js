// Medición: Google Analytics 4 y píxel de Meta, solo con consentimiento.
//
// Los IDs llegan de /api/config (variables GA_ID y META_PIXEL_ID en Vercel).
// Sin IDs no se muestra el banner ni se carga nada. Con IDs, el banner pide
// permiso y los scripts de terceros solo se cargan si la persona acepta.
// La decisión se recuerda en localStorage ('gs_cookie_consent').
//
// Uso desde script.js: gsTrack('generate_lead', { lead_type: 'formulario' }).
// Antes de aceptar (o si rechaza), los eventos se descartan.

(function () {
  const CONSENT_KEY = 'gs_cookie_consent';
  // Equivalencia de eventos propios → eventos estándar de Meta
  const META_EVENTS = {
    generate_lead: 'Lead',
    click_whatsapp_co: 'Contact',
    click_whatsapp_us: 'Contact',
    click_booking: 'Contact'
  };

  let ids = {};
  let loaded = false;

  function readConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
  }

  function saveConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* modo privado: solo esta visita */ }
  }

  function loadScript(src) {
    const s = document.createElement('script');
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  }

  function loadTrackers() {
    if (loaded) return;
    loaded = true;

    if (ids.gaId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', ids.gaId, { anonymize_ip: true });
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ids.gaId));
    }

    if (ids.metaPixelId) {
      // Cola mínima de fbq: fbevents.js la procesa al cargar
      const fbq = window.fbq = function () {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      fbq('init', ids.metaPixelId);
      fbq('track', 'PageView');
      loadScript('https://connect.facebook.net/en_US/fbevents.js');
    }
  }

  window.gsTrack = function (event, params) {
    if (!loaded) return;
    if (window.gtag) window.gtag('event', event, params || {});
    if (window.fbq && META_EVENTS[event]) {
      window.fbq('track', META_EVENTS[event], { content_name: event });
    }
  };

  function showBanner() {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    banner.hidden = false;
    banner.querySelector('[data-consent="accept"]').addEventListener('click', () => {
      saveConsent('accepted');
      banner.hidden = true;
      loadTrackers();
    });
    banner.querySelector('[data-consent="reject"]').addEventListener('click', () => {
      saveConsent('rejected');
      banner.hidden = true;
    });
  }

  // siteConfig lo define script.js (fetch a /api/config)
  const configReady = window.siteConfig || fetch('/api/config').then(r => (r.ok ? r.json() : {})).catch(() => ({}));
  configReady.then(cfg => {
    ids = { gaId: cfg.gaId, metaPixelId: cfg.metaPixelId };
    if (!ids.gaId && !ids.metaPixelId) return;
    const consent = readConsent();
    if (consent === 'accepted') loadTrackers();
    else if (consent !== 'rejected') showBanner();
  });
})();
