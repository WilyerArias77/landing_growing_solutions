// Genera las páginas de servicio estáticas a partir de content/paginas.js.
//
//   npm run paginas
//
// El sitio no tiene paso de build en Vercel: este script se corre en local y
// los .html generados se suben al repo. El menú, el pie, los botones de
// WhatsApp y el aviso de cookies se copian de index.html, así que cualquier
// cambio ahí llega a todas las páginas al volver a generarlas.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.growingsolutions.online';

const read = (f) => readFileSync(join(ROOT, f), 'utf8');

// content/paginas.js define window.GS_PAGES: se evalúa en un contexto aislado
const sandbox = { window: {} };
vm.runInNewContext(read('content/paginas.js'), sandbox);
const PAGES = sandbox.window.GS_PAGES;

// Las traducciones de script.js (objeto `translations`) se aplican al HTML
// estático en el idioma por defecto de cada página, para que buscadores y
// visitantes sin JavaScript vean el menú y el pie en ese idioma.
const scriptJs = read('script.js');
const tStart = scriptJs.indexOf('const translations = {');
const tEnd = scriptJs.indexOf('\n};\n', tStart);
if (tStart < 0 || tEnd < 0) throw new Error('No se encontró `translations` en script.js');
const TRANSLATIONS = vm.runInNewContext('(' + scriptJs.slice(tStart + 'const translations = '.length, tEnd + 2) + ')');

const index = read('index.html');

/** Recorta index.html entre dos marcadores (el final no se incluye). */
function slice(start, end) {
  const i = index.indexOf(start);
  const j = index.indexOf(end, i);
  if (i < 0 || j < 0) throw new Error(`No se encontró el bloque ${start}`);
  return index.slice(i, j).trimEnd();
}

// Los anclas de la portada (#servicios) apuntan a la portada desde otras páginas
const toHome = (html) => html.replace(/href="#([a-z-]+)"/g, 'href="/#$1"');

const nav = toHome(slice('  <!-- ── NAV ── -->', '  <!-- ── HERO ── -->'));
const footer = toHome(slice('  <!-- ── FOOTER ── -->', '  <!-- ── WHATSAPP FLOATING BUTTONS ── -->'));
const floating = slice('  <!-- ── WHATSAPP FLOATING BUTTONS ── -->', '  <!-- ── AVISO DE COOKIES');
const cookies = slice('  <!-- ── AVISO DE COOKIES', '  <script src="/content/stats.js">');

/** El SVG de Lucide que index.html ya usa para ese ícono. */
function icon(name) {
  const m = index.match(new RegExp(`<!-- Lucide: ${name} -->\\s*(<svg[\\s\\S]*?</svg>)`));
  if (!m) throw new Error(`Ícono ${name} no está en index.html`);
  return m[1];
}

const esc = (v) => String(v)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Pone el texto de cada elemento con data-i18n en `lang`. Solo toca elementos
 * cuyo contenido es texto plano; los que tienen hijos se traducen por sus hijos.
 */
function localize(html, lang, pageTexts) {
  const dict = { ...TRANSLATIONS[lang], page: pageTexts };
  const lookup = (key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);
  return html.replace(/(<[a-z0-9]+\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/)/g,
    (all, open, key, _text, close) => {
      const v = lookup(key);
      return typeof v === 'string' ? open + esc(v) + close : all;
    });
}

const WA_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.71-1.248A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.386 0-4.594-.83-6.326-2.216l-.144-.116-3.491.924.94-3.437-.12-.149A9.957 9.957 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" /></svg>';
const CAL_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>';
const CHECK_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>';

/**
 * Botones de agenda + WhatsApp (el de WhatsApp cambia de país con el idioma).
 * Con `wa` fijo (página /us), WhatsApp de ese país va primero como botón principal.
 */
function actions(page) {
  if (page.wa === 'us') {
    return `<div class="hero-actions">
          <a href="https://wa.me/19172272181?text=Hi%2C%20I%27d%20like%20information%20about%20Growing%20Solutions%20services"
            class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
            ${WA_ICON}<span data-i18n="wa.ctaMobileUs">WhatsApp USA +1 917 227 2181</span>
          </a>
          <a href="/#contacto" class="btn btn-ghost" data-booking>
            ${CAL_ICON}
            <span data-i18n="hero.ctaPrimary">Agenda una llamada gratis de 20 minutos</span>
          </a>
        </div>`;
  }
  return `<div class="hero-actions">
          <a href="/#contacto" class="btn btn-green" data-booking>
            ${CAL_ICON}
            <span data-i18n="hero.ctaPrimary">Agenda una llamada gratis de 20 minutos</span>
          </a>
          <a href="https://wa.me/573242754406?text=Hola%2C%20quiero%20información%20sobre%20los%20servicios%20de%20Growing%20Solutions"
            class="btn btn-ghost" target="_blank" rel="noopener noreferrer" data-wa="co">
            ${WA_ICON}<span data-i18n="pagina.whatsapp">Escríbenos por WhatsApp</span>
          </a>
          <a href="https://wa.me/19172272181?text=Hi%2C%20I%27d%20like%20information%20about%20Growing%20Solutions%20services"
            class="btn btn-ghost" target="_blank" rel="noopener noreferrer" data-wa="us">
            ${WA_ICON}<span data-i18n="pagina.whatsapp">Escríbenos por WhatsApp</span>
          </a>
        </div>`;
}

const pagePath = (slug, page) => page.path || `/servicios/${slug}`;

function jsonLd(slug, page) {
  const url = SITE + pagePath(slug, page);
  const es = page[page.defaultLang || 'es'];
  const areas = page.areaServed || ['Colombia', 'United States'];
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: es.kicker,
      description: es.metaDesc,
      url,
      serviceType: es.kicker,
      areaServed: areas.map((name) => ({ '@type': 'Country', name })),
      availableLanguage: ['es', 'en'],
      provider: { '@type': 'ProfessionalService', name: 'Growing Solutions', url: `${SITE}/` }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: es.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Growing Solutions', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: es.kicker, item: url }
      ]
    }
  ];
}

function render(slug, page) {
  const lang = page.defaultLang || 'es';
  const other = lang === 'es' ? 'en' : 'es';
  const es = page[lang];
  const url = SITE + pagePath(slug, page);
  const ogImage = existsSync(join(ROOT, 'og-image.png'))
    ? `\n  <meta property="og:image" content="${SITE}/og-image.png" />\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />\n  <meta name="twitter:image" content="${SITE}/og-image.png" />`
    : '';
  const entregables = es.entregables.map((e, n) =>
    `\n            <li>${CHECK_ICON}<span data-i18n="page.entregables.${n}">${esc(e)}</span></li>`).join('');
  const faqs = es.faqs.map((f, n) => `
          <details class="faq-item">
            <summary data-i18n="page.faqs.${n}.q">${esc(f.q)}</summary>
            <p data-i18n="page.faqs.${n}.a">${esc(f.a)}</p>
          </details>`).join('');
  // JSON-LD es un bloque de datos (no se ejecuta), así que la CSP no lo bloquea.
  // Se escapa '<' para que ningún texto pueda cerrar la etiqueta <script>.
  const ld = JSON.stringify(jsonLd(slug, page), null, 2).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<!-- Generado por tools/generar-paginas.mjs desde content/paginas.js. No editar a mano. -->
<html lang="${lang}">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(es.metaTitle)}</title>
  <meta name="description" content="${esc(es.metaDesc)}" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="${lang}" href="${url}" />
  <link rel="alternate" hreflang="${other}" href="${url}?lang=${other}" />
  <link rel="alternate" hreflang="x-default" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Growing Solutions" />
  <meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'es_CO'}" />
  <meta property="og:locale:alternate" content="${lang === 'en' ? 'es_CO' : 'en_US'}" />
  <meta property="og:title" content="${esc(es.metaTitle)}" />
  <meta property="og:description" content="${esc(es.metaDesc)}" />
  <meta property="og:url" content="${url}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(es.metaTitle)}" />
  <meta name="twitter:description" content="${esc(es.metaDesc)}" />${ogImage}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/chat.css" />
  <link rel="stylesheet" href="/styles.css" />
  <script type="application/ld+json">
${ld}
  </script>
</head>

<body data-page="${slug}" data-default-lang="${lang}"${page.wa ? ` data-wa-country="${page.wa}"` : ''}>

${nav}

  <main class="service-page">
    <section class="sp-hero">
      <div class="container">
        <a href="/#servicios" class="sp-back">← <span data-i18n="pagina.back">Todos los servicios</span></a>
        <div class="sp-hero-head">
          <div class="service-icon icon-blue">${icon(page.icon)}</div>
          <div class="section-tag" data-i18n="page.kicker">${esc(es.kicker)}</div>
        </div>
        <h1 data-i18n="page.h1">${esc(es.h1)}</h1>
        <p class="sp-intro" data-i18n="page.intro">${esc(es.intro)}</p>
        ${actions(page)}
      </div>
    </section>

    <section class="section sp-section">
      <div class="container sp-grid">
        <div class="sp-card fade-in">
          <h2 data-i18n="pagina.problemaTitle">El problema</h2>
          <p data-i18n="page.problema">${esc(es.problema)}</p>
        </div>
        <div class="sp-card sp-card-accent fade-in">
          <h2 data-i18n="pagina.solucionTitle">Cómo lo resolvemos</h2>
          <p data-i18n="page.solucion">${esc(es.solucion)}</p>
        </div>
      </div>
    </section>

    <section class="section sp-section">
      <div class="container sp-narrow fade-in">
        <h2 class="sp-h2" data-i18n="pagina.entregablesTitle">Qué recibes</h2>
        <ul class="sp-deliverables">${entregables}
        </ul>
      </div>
    </section>

    <section class="section sp-section">
      <div class="container sp-narrow fade-in">
        <h2 class="sp-h2" data-i18n="pagina.faqTitle">Preguntas frecuentes</h2>
        <div class="faq-list">${faqs}
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-inner fade-in">
          <div class="section-tag" data-i18n="pagina.ctaTag">Siguiente paso</div>
          <h2 data-i18n="pagina.ctaTitle">¿Hablamos de tu caso?</h2>
          <p data-i18n="pagina.ctaText">En una llamada gratis de 20 minutos revisamos tu situación y te decimos por dónde empezar. Sin compromiso.</p>
          <div class="cta-actions">
          ${actions(page)}
          </div>
        </div>
      </div>
    </section>
  </main>

${footer}

${floating}

${cookies}

  <script src="/content/paginas.js"></script>
  <script src="/script.js"></script>
  <script src="/analytics.js"></script>
  <!-- GS Bot: el widget se construye por JS y habla solo con /api/chat -->
  <script src="/chat.js"></script>
</body>

</html>
`;
}

for (const [slug, page] of Object.entries(PAGES)) {
  const lang = page.defaultLang || 'es';
  const rel = pagePath(slug, page).slice(1) + '.html';
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  const html = localize(render(slug, page), lang, page[lang]);
  writeFileSync(file, html.replace(/\r?\n/g, '\n'));
  console.log('generada', rel);
}

// ── /recursos ──
// Lista los recursos de content/recursos.js que tienen archivo. Sin ninguno,
// la página dice "Muy pronto", no muestra formulario y no se indexa.
const resSandbox = { window: {} };
vm.runInNewContext(read('content/recursos.js'), resSandbox);
const RESOURCES = (resSandbox.window.GS_RECURSOS || []).filter((r) => typeof r.archivo === 'string' && r.archivo);

function renderRecursos() {
  const url = `${SITE}/recursos`;
  const published = RESOURCES.length > 0;
  const texts = { items: RESOURCES.map((r) => ({ titulo: r.titulo.es, descripcion: r.descripcion.es })) };
  const cards = RESOURCES.map((r, n) => `
          <label class="resource-card">
            <input type="radio" name="resource" value="${esc(r.id)}"${n === 0 ? ' checked' : ''} />
            <span class="resource-body">
              <strong data-i18n="page.items.${n}.titulo">${esc(r.titulo.es)}</strong>
              <span data-i18n="page.items.${n}.descripcion">${esc(r.descripcion.es)}</span>
            </span>
          </label>`).join('');

  const body = published ? `
        <form class="lead-form resource-form" id="resourceForm" novalidate>
          <div class="resource-list">${cards}
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label for="r-name"><span data-i18n="form.labelName">Nombre</span><span class="required">*</span></label>
              <input type="text" id="r-name" name="name" autocomplete="name" maxlength="80" required data-i18n-placeholder="form.phName" />
            </div>
            <div class="form-group">
              <label for="r-email"><span data-i18n="form.labelEmail">Correo electrónico</span><span class="required">*</span></label>
              <input type="email" id="r-email" name="email" autocomplete="email" maxlength="120" required data-i18n-placeholder="form.phEmail" />
            </div>
            <div class="hp-field" aria-hidden="true">
              <label for="r-hp">No rellenar</label>
              <input type="text" id="r-hp" name="companyFax" tabindex="-1" autocomplete="off" />
            </div>
          </div>
          <div class="consent-row">
            <input type="checkbox" id="r-consent" name="consent" />
            <label for="r-consent">
              <span data-i18n="form.consent">Autorizo el tratamiento de mis datos personales para que Growing Solutions me contacte y me envíe información sobre sus servicios, conforme a la</span>
              <a href="/politica-datos" target="_blank" rel="noopener" data-i18n="form.consentLink">Política de Tratamiento de Datos</a>.<span class="required">*</span>
            </label>
          </div>
          <div class="form-submit-row">
            <button type="submit" class="btn-submit" id="r-submit" data-i18n="recursos.submit">Descargar gratis</button>
          </div>
          <div class="form-status" id="r-status" role="alert"></div>
        </form>
        <div class="form-success" id="r-success" tabindex="-1" hidden>
          <h3 data-i18n="recursos.successTitle">¡Listo! Tu descarga está aquí</h3>
          <p data-i18n="recursos.successText">También te enviamos el enlace a tu correo.</p>
          <div class="cta-actions">
            <a href="#" class="btn btn-green" id="r-download" target="_blank" rel="noopener noreferrer" data-i18n="recursos.download">Descargar</a>
            <a href="/#contacto" class="btn btn-ghost" data-booking data-i18n="hero.ctaPrimary">Agenda una llamada gratis de 20 minutos</a>
          </div>
        </div>` : `
        <p class="resource-soon" data-i18n="recursos.soon">Muy pronto publicaremos aquí plantillas y guías gratuitas. Mientras tanto, agenda una llamada o escríbenos por WhatsApp.</p>
        ${actions({})}`;

  // La invitación a descargar solo tiene sentido si hay algo que descargar
  const intro = published
    ? '        <p class="sp-intro" data-i18n="recursos.intro">Déjanos tu nombre y correo y descarga la plantilla al instante. También te la enviamos por correo.</p>\n'
    : '';

  const html = `<!DOCTYPE html>
<!-- Generado por tools/generar-paginas.mjs desde content/recursos.js. No editar a mano. -->
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Recursos gratis para pymes | Growing Solutions</title>
  <meta name="description" content="Plantillas y guías gratuitas de contabilidad y finanzas para pymes en Colombia y Estados Unidos." />${published ? `
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="es" href="${url}" />
  <link rel="alternate" hreflang="en" href="${url}?lang=en" />
  <link rel="alternate" hreflang="x-default" href="${url}" />` : `
  <meta name="robots" content="noindex" />`}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/chat.css" />
  <link rel="stylesheet" href="/styles.css" />
</head>

<body data-page="recursos" data-default-lang="es">

${nav}

  <main class="service-page">
    <section class="sp-hero">
      <div class="container sp-narrow">
        <div class="section-tag" data-i18n="recursos.tag">Recursos gratis</div>
        <h1 data-i18n="recursos.title">Herramientas gratis para ordenar las finanzas de tu pyme</h1>
${intro}${body}
      </div>
    </section>
  </main>

${footer}

${floating}

${cookies}

  <script src="/content/recursos.js"></script>
  <script src="/script.js"></script>
  <script src="/analytics.js"></script>
  <script src="/chat.js"></script>
</body>

</html>
`;
  writeFileSync(join(ROOT, 'recursos.html'), localize(html, 'es', texts).replace(/\r?\n/g, '\n'));
  console.log('generada', 'recursos.html', published ? `(${RESOURCES.length} recurso/s)` : '(sin recursos: "Muy pronto", noindex)');
}
renderRecursos();

// ── /calculadora y /diagnostico ──
// La interfaz la construye herramientas.js; aquí va el encabezado (indexable)
// y el contenedor. Los textos salen de translations.*.herr en script.js.
function renderTool(slug, key) {
  const url = `${SITE}/${slug}`;
  const es = TRANSLATIONS.es.herr[key];
  const ogImage = existsSync(join(ROOT, 'og-image.png'))
    ? `\n  <meta property="og:image" content="${SITE}/og-image.png" />\n  <meta name="twitter:image" content="${SITE}/og-image.png" />`
    : '';
  const html = `<!DOCTYPE html>
<!-- Generado por tools/generar-paginas.mjs (textos en script.js → herr.${key}). No editar a mano. -->
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(es.metaTitle)}</title>
  <meta name="description" content="${esc(es.metaDesc)}" />
  <link rel="canonical" href="${url}" />
  <link rel="alternate" hreflang="es" href="${url}" />
  <link rel="alternate" hreflang="en" href="${url}?lang=en" />
  <link rel="alternate" hreflang="x-default" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Growing Solutions" />
  <meta property="og:title" content="${esc(es.metaTitle)}" />
  <meta property="og:description" content="${esc(es.metaDesc)}" />
  <meta property="og:url" content="${url}" />
  <meta name="twitter:card" content="summary_large_image" />${ogImage}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="/favicon-32.png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/chat.css" />
  <link rel="stylesheet" href="/styles.css" />
</head>

<body data-page="${slug}" data-default-lang="es">

${nav}

  <main class="service-page">
    <section class="sp-hero">
      <div class="container">
        <div class="section-tag" data-i18n="page.tag">${esc(es.tag)}</div>
        <h1 data-i18n="page.title">${esc(es.title)}</h1>
        <p class="sp-intro" data-i18n="page.intro">${esc(es.intro)}</p>
        <div class="tool-root" id="${slug}">
          <noscript><p class="resource-soon">${esc(es.noscript)}</p></noscript>
        </div>
      </div>
    </section>
  </main>

${footer}

${floating}

${cookies}

  <script src="/script.js"></script>
  <script src="/analytics.js"></script>
  <script src="/herramientas.js"></script>
  <script src="/chat.js"></script>
</body>

</html>
`;
  writeFileSync(join(ROOT, `${slug}.html`), localize(html, 'es', es).replace(/\r?\n/g, '\n'));
  console.log('generada', `${slug}.html`);
}
renderTool('calculadora', 'calc');
renderTool('diagnostico', 'diag');
