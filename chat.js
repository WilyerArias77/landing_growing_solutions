/* GS Bot — widget de chat de Growing Solutions.
 *
 * Habla unicamente con /api/chat en el mismo origen. Aqui no hay ninguna clave:
 * la API key de OpenAI vive solo en la funcion serverless.
 *
 * El widget se construye por JS para no ensuciar index.html. Todo el texto que
 * llega del modelo se inserta con textContent (nunca innerHTML): aunque el modelo
 * devolviera HTML, no se ejecuta.
 */
(function () {
  'use strict';

  var ENDPOINT = '/api/chat';
  var STORE_KEY = 'gsb_chat';
  var MAX_CHARS = 1500;

  var I18N = {
    es: {
      title: 'GS Bot',
      status: 'En línea',
      launcherAria: 'Abrir el chat de ayuda',
      closeAria: 'Cerrar el chat',
      tooltip: '¿Tienes dudas? Escríbenos',
      welcome: 'Hola, soy GS Bot, el asistente de Growing Solutions. Puedo contarte sobre nuestros servicios de contabilidad, finanzas, automatización y desarrollo de software. ¿En qué te ayudo?',
      chips: ['¿Qué servicios ofrecen?', '¿Cómo trabajan?', 'Quiero una asesoría'],
      placeholder: 'Escribe tu mensaje...',
      send: 'Enviar mensaje',
      legal: 'Asistente virtual. Para temas contables o legales específicos te conecta con un asesor.',
      leadOk: '✓ Datos enviados. Un asesor te contacta en menos de 24 horas.',
      errNetwork: 'No pude conectarme. Escríbenos por WhatsApp al +57 324 275 4406 o a wilyer.arias@growingsolutions.online',
      errBusy: 'Hay muchas consultas en este momento. Intenta en unos minutos o escríbenos al WhatsApp +57 324 275 4406',
      errConfig: 'El asistente no está disponible ahora mismo. Escríbenos por WhatsApp al +57 324 275 4406',
      errCut: '… (se interrumpió la respuesta)'
    },
    en: {
      title: 'GS Bot',
      status: 'Online',
      launcherAria: 'Open the help chat',
      closeAria: 'Close the chat',
      tooltip: 'Questions? Chat with us',
      welcome: "Hi, I'm GS Bot, the Growing Solutions assistant. I can tell you about our accounting, finance, process automation and software development services. How can I help?",
      chips: ['What services do you offer?', 'How do you work?', 'I want a consultation'],
      placeholder: 'Type your message...',
      send: 'Send message',
      legal: 'Virtual assistant. For specific accounting or legal matters it connects you with an advisor.',
      leadOk: '✓ Details sent. An advisor will contact you within 24 hours.',
      errNetwork: "I couldn't connect. Reach us on WhatsApp at +1 917 227 2181 or at wilyer.arias@growingsolutions.online",
      errBusy: 'There are many requests right now. Try again in a few minutes or WhatsApp us at +1 917 227 2181',
      errConfig: 'The assistant is unavailable right now. Reach us on WhatsApp at +1 917 227 2181',
      errCut: '… (the answer was cut off)'
    }
  };

  var lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  var t = function (k) { return (I18N[lang] || I18N.es)[k]; };

  var history = [];
  var leadRegistrado = false;
  var enviando = false;
  var abierto = false;
  var el = {};

  // ── Utilidades ──────────────────────────────────────────────────────────

  function make(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var INLINE = /\*\*([^*]+)\*\*|(https?:\/\/[^\s<>()]+)|([\w.+-]+@[\w-]+\.[\w.-]+)/g;

  // Render seguro: negritas, enlaces y correos. Todo lo demas es texto plano.
  function renderInline(parent, line) {
    var last = 0, m;
    INLINE.lastIndex = 0;
    while ((m = INLINE.exec(line)) !== null) {
      if (m.index > last) parent.appendChild(document.createTextNode(line.slice(last, m.index)));
      if (m[1]) {
        parent.appendChild(make('strong', null, m[1]));
      } else if (m[2]) {
        var a = make('a', null, m[2].replace(/^https?:\/\//, ''));
        a.href = m[2];
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        parent.appendChild(a);
      } else {
        var mail = make('a', null, m[3]);
        mail.href = 'mailto:' + m[3];
        parent.appendChild(mail);
      }
      last = m.index + m[0].length;
    }
    if (last < line.length) parent.appendChild(document.createTextNode(line.slice(last)));
  }

  function renderText(node, text) {
    node.textContent = '';
    var lines = String(text).split('\n');
    for (var i = 0; i < lines.length; i++) {
      if (i) node.appendChild(document.createElement('br'));
      renderInline(node, lines[i]);
    }
  }

  function scrollDown() {
    el.messages.scrollTop = el.messages.scrollHeight;
  }

  function addMsg(role, text) {
    var node = make('div', 'gsb-msg gsb-' + role);
    renderText(node, text);
    el.messages.appendChild(node);
    scrollDown();
    return node;
  }

  function addBadge(text) {
    el.messages.appendChild(make('div', 'gsb-badge', text));
    scrollDown();
  }

  // ── Persistencia de la conversacion durante la visita ───────────────────

  function save() {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ history: history, lead: leadRegistrado }));
    } catch (e) { /* modo privado o cuota llena: el chat sigue funcionando */ }
  }

  function restore() {
    try {
      var raw = sessionStorage.getItem(STORE_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      if (!data || !Array.isArray(data.history) || !data.history.length) return false;
      history = data.history;
      leadRegistrado = Boolean(data.lead);
      for (var i = 0; i < history.length; i++) {
        addMsg(history[i].role === 'user' ? 'user' : 'bot', history[i].content);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  // ── Construccion del widget ─────────────────────────────────────────────

  var ICON_CHAT = '<path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.7 1.4 5.1 3.7 6.7v3.3c0 .4.5.7.9.4l3.2-2.1c.7.1 1.5.2 2.2.2 5.5 0 10-3.9 10-8.5S17.5 2 12 2zM7.5 12.2a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8zm4.5 0a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8zm4.5 0a1.4 1.4 0 110-2.8 1.4 1.4 0 010 2.8z"/>';
  var ICON_X = '<path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/>';
  var ICON_SEND = '<path d="M2.5 21L23 12 2.5 3v7l14 2-14 2v7z"/>';

  function svg(paths, cls) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    if (cls) s.setAttribute('class', cls);
    s.innerHTML = paths; // constantes del propio archivo, no entrada externa
    return s;
  }

  function build() {
    // Lanzador
    el.launcher = make('button', 'gsb-launcher');
    el.launcher.type = 'button';
    el.launcher.setAttribute('aria-expanded', 'false');
    el.launcher.setAttribute('aria-controls', 'gsb-panel');
    el.launcher.setAttribute('aria-label', t('launcherAria'));
    el.launcher.appendChild(svg(ICON_CHAT, 'gsb-open-icon'));
    el.launcher.appendChild(svg(ICON_X, 'gsb-close-icon'));
    el.dot = make('span', 'gsb-dot');
    el.launcher.appendChild(el.dot);
    el.tooltip = make('span', 'gsb-tooltip', t('tooltip'));
    el.launcher.appendChild(el.tooltip);

    // Panel
    el.panel = make('div', 'gsb-panel');
    el.panel.id = 'gsb-panel';
    el.panel.setAttribute('role', 'dialog');
    el.panel.setAttribute('aria-label', 'GS Bot');

    var header = make('div', 'gsb-header');
    header.appendChild(make('div', 'gsb-avatar', 'GS'));
    var meta = make('div');
    el.title = make('div', 'gsb-title', t('title'));
    el.statusEl = make('div', 'gsb-status', t('status'));
    meta.appendChild(el.title);
    meta.appendChild(el.statusEl);
    header.appendChild(meta);

    el.close = make('button', 'gsb-header-close');
    el.close.type = 'button';
    el.close.setAttribute('aria-label', t('closeAria'));
    el.close.appendChild(svg(ICON_X));
    header.appendChild(el.close);
    el.panel.appendChild(header);

    el.messages = make('div', 'gsb-messages');
    el.messages.setAttribute('role', 'log');
    el.messages.setAttribute('aria-live', 'polite');
    el.panel.appendChild(el.messages);

    el.chips = make('div', 'gsb-chips');
    el.panel.appendChild(el.chips);

    el.form = make('form', 'gsb-form');
    el.input = make('textarea', 'gsb-input');
    el.input.rows = 1;
    el.input.maxLength = MAX_CHARS;
    el.input.placeholder = t('placeholder');
    el.input.setAttribute('aria-label', t('placeholder'));
    el.send = make('button', 'gsb-send');
    el.send.type = 'submit';
    el.send.setAttribute('aria-label', t('send'));
    el.send.appendChild(svg(ICON_SEND));
    el.form.appendChild(el.input);
    el.form.appendChild(el.send);
    el.panel.appendChild(el.form);

    el.legal = make('div', 'gsb-legal', t('legal'));
    el.panel.appendChild(el.legal);

    document.body.appendChild(el.launcher);
    document.body.appendChild(el.panel);
  }

  function paintChips() {
    el.chips.textContent = '';
    if (history.length > 0) return;
    var list = t('chips');
    for (var i = 0; i < list.length; i++) {
      (function (texto) {
        var b = make('button', 'gsb-chip', texto);
        b.type = 'button';
        b.addEventListener('click', function () { enviar(texto); });
        el.chips.appendChild(b);
      })(list[i]);
    }
  }

  // ── Idioma ──────────────────────────────────────────────────────────────

  function applyLang() {
    el.launcher.setAttribute('aria-label', abierto ? t('closeAria') : t('launcherAria'));
    el.tooltip.textContent = t('tooltip');
    el.close.setAttribute('aria-label', t('closeAria'));
    el.statusEl.textContent = t('status');
    el.input.placeholder = t('placeholder');
    el.input.setAttribute('aria-label', t('placeholder'));
    el.send.setAttribute('aria-label', t('send'));
    el.legal.textContent = t('legal');
    if (history.length === 0) {
      el.messages.textContent = '';
      addMsg('bot', t('welcome'));
    }
    paintChips();
  }

  // El toggle ES/EN de la pagina cambia documentElement.lang; nos enganchamos ahi.
  function watchLang() {
    new MutationObserver(function () {
      var nuevo = document.documentElement.lang === 'en' ? 'en' : 'es';
      if (nuevo !== lang) { lang = nuevo; applyLang(); }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  // ── Apertura / cierre ───────────────────────────────────────────────────

  function abrir() {
    abierto = true;
    el.panel.classList.add('gsb-open');
    el.launcher.setAttribute('aria-expanded', 'true');
    el.launcher.setAttribute('aria-label', t('closeAria'));
    if (el.dot) { el.dot.remove(); el.dot = null; }
    setTimeout(function () { el.input.focus(); }, 220);
    scrollDown();
  }

  function cerrar() {
    abierto = false;
    el.panel.classList.remove('gsb-open');
    el.launcher.setAttribute('aria-expanded', 'false');
    el.launcher.setAttribute('aria-label', t('launcherAria'));
    el.launcher.focus();
  }

  // ── Envio ───────────────────────────────────────────────────────────────

  function typingOn() {
    el.typing = make('div', 'gsb-msg gsb-bot gsb-typing');
    el.typing.appendChild(make('span'));
    el.typing.appendChild(make('span'));
    el.typing.appendChild(make('span'));
    el.messages.appendChild(el.typing);
    scrollDown();
  }

  function typingOff() {
    if (el.typing) { el.typing.remove(); el.typing = null; }
  }

  function setBusy(v) {
    enviando = v;
    el.send.disabled = v;
    el.input.disabled = v;
  }

  function errorMsg(clave) {
    typingOff();
    var n = make('div', 'gsb-msg gsb-error');
    renderText(n, t(clave));
    el.messages.appendChild(n);
    scrollDown();
  }

  function enviar(texto) {
    if (enviando) return;
    texto = String(texto || '').trim().slice(0, MAX_CHARS);
    if (!texto) return;

    el.chips.textContent = '';
    addMsg('user', texto);
    history.push({ role: 'user', content: texto });
    save();

    el.input.value = '';
    el.input.style.height = 'auto';
    setBusy(true);
    typingOn();

    stream();
  }

  function stream() {
    var burbuja = null;
    var acumulado = '';

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, lang: lang, leadRegistrado: leadRegistrado })
    }).then(function (res) {
      if (!res.ok) {
        if (res.status === 429) throw new Error('busy');
        if (res.status === 503) throw new Error('config');
        throw new Error('http');
      }
      if (!res.body) throw new Error('http');

      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      function terminar() {
        typingOff();
        if (acumulado.trim()) {
          history.push({ role: 'assistant', content: acumulado });
          save();
        } else if (!burbuja) {
          errorMsg('errNetwork');
        }
        setBusy(false);
        if (abierto) el.input.focus();
      }

      function pump() {
        return reader.read().then(function (r) {
          if (r.done) return terminar();
          buffer += decoder.decode(r.value, { stream: true });

          var partes = buffer.split('\n\n');
          buffer = partes.pop();

          for (var i = 0; i < partes.length; i++) {
            var linea = partes[i].trim();
            if (linea.indexOf('data:') !== 0) continue;
            var ev;
            try { ev = JSON.parse(linea.slice(5).trim()); } catch (e) { continue; }

            if (ev.type === 'delta') {
              typingOff();
              if (!burbuja) burbuja = addMsg('bot', '');
              acumulado += ev.text;
              renderText(burbuja, acumulado);
              scrollDown();
            } else if (ev.type === 'lead') {
              if (ev.ok) { leadRegistrado = true; addBadge(t('leadOk')); }
            } else if (ev.type === 'done') {
              if (ev.leadRegistrado) leadRegistrado = true;
            } else if (ev.type === 'error') {
              if (ev.recuperable && acumulado) {
                acumulado += ' ' + t('errCut');
                renderText(burbuja, acumulado);
              } else {
                errorMsg('errNetwork');
              }
            }
          }
          return pump();
        });
      }

      return pump();
    }).catch(function (err) {
      typingOff();
      setBusy(false);
      var m = err && err.message;
      errorMsg(m === 'busy' ? 'errBusy' : m === 'config' ? 'errConfig' : 'errNetwork');
    });
  }

  // ── Arranque ────────────────────────────────────────────────────────────

  function init() {
    build();
    watchLang();

    if (!restore()) addMsg('bot', t('welcome'));
    paintChips();

    el.launcher.addEventListener('click', function () {
      if (abierto) { cerrar(); } else { abrir(); }
    });
    el.close.addEventListener('click', cerrar);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && abierto) cerrar();
    });

    el.form.addEventListener('submit', function (e) {
      e.preventDefault();
      enviar(el.input.value);
    });

    el.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        enviar(el.input.value);
      }
    });

    // Crece con el contenido hasta el tope de CSS
    el.input.addEventListener('input', function () {
      el.input.style.height = 'auto';
      el.input.style.height = Math.min(el.input.scrollHeight, 110) + 'px';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
