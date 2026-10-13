// Respuesta automatica al prospecto (formulario y descarga de recursos).
//
// Seguridad: el correo va a una direccion que escribio un visitante, asi que
// el contenido es FIJO. No se repite nada de lo que escribio salvo el nombre,
// y solo si parece un nombre (letras, espacios, punto, apostrofe, guion).
// Asi el formulario no sirve para mandar texto o enlaces arbitrarios a
// terceros. El freno de volumen (una respuesta por correo al dia) lo aplica
// quien llama, con recentLeadsByEmail().

import { sendEmail } from './notify.js';

const SITE = 'https://www.growingsolutions.online';
const WA = {
  co: 'https://wa.me/573242754406',
  us: 'https://wa.me/19172272181'
};

const esc = (v) => String(v ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** Primer nombre, solo si es texto de nombre. Si no, saludo generico. */
function firstName(name) {
  const first = String(name || '').trim().split(/\s+/)[0] || '';
  return /^[\p{L}][\p{L}.'-]{0,29}$/u.test(first) ? first : '';
}

/** Enlace de agenda desde BOOKING_URL, solo https (igual que /api/config). */
function bookingUrl() {
  try {
    const url = new URL(String(process.env.BOOKING_URL || '').trim());
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

const COPY = {
  es: {
    subject: 'Recibimos tu solicitud — Growing Solutions',
    subjectResource: (t) => `Tu descarga: ${t} — Growing Solutions`,
    subjectDetail: 'Tu estimación de ahorro — Growing Solutions',
    thanksDetail: 'Gracias por usar nuestra calculadora. Este es el detalle de tu estimación:',
    hello: (n) => (n ? `Hola, ${n}:` : 'Hola:'),
    thanks: 'Gracias por escribirnos. Recibimos tu solicitud y te contactaremos en menos de 24 horas por correo o WhatsApp.',
    thanksResource: 'Gracias por descargar nuestro recurso. Aquí tienes el enlace:',
    download: 'Descargar',
    next: 'Si prefieres no esperar, agenda una llamada gratis de 20 minutos con nuestro contador senior:',
    nextWa: 'Si prefieres no esperar, escríbenos por WhatsApp:',
    book: 'Agendar llamada',
    wa: 'Escribir por WhatsApp',
    sign: 'Wilyer Arias — Growing Solutions',
    tagline: 'Finanzas que evolucionan, tecnología que impulsa',
    footer: 'Recibes este correo porque dejaste tus datos en growingsolutions.online. Si no fuiste tú, ignóralo: no te escribiremos de nuevo.'
  },
  en: {
    subject: 'We received your request — Growing Solutions',
    subjectResource: (t) => `Your download: ${t} — Growing Solutions`,
    subjectDetail: 'Your savings estimate — Growing Solutions',
    thanksDetail: 'Thank you for using our calculator. Here are the details of your estimate:',
    hello: (n) => (n ? `Hi ${n},` : 'Hi,'),
    thanks: 'Thank you for reaching out. We received your request and will contact you within 24 hours by email or WhatsApp.',
    thanksResource: 'Thank you for downloading our resource. Here is your link:',
    download: 'Download',
    next: "If you'd rather not wait, book a free 20-minute call with our senior accountant:",
    nextWa: "If you'd rather not wait, message us on WhatsApp:",
    book: 'Book a call',
    wa: 'Message us on WhatsApp',
    sign: 'Wilyer Arias — Growing Solutions',
    tagline: 'Evolving finance, empowering technology',
    footer: 'You are receiving this email because you left your details at growingsolutions.online. If it was not you, ignore it: we will not write again.'
  }
};

function button(href, label) {
  return `<a href="${esc(href)}" style="display:inline-block;padding:12px 22px;border-radius:10px;background:#0a2fd4;color:#ffffff;font-weight:700;text-decoration:none;font-size:15px;">${esc(label)}</a>`;
}

/**
 * @param {object} row fila del lead (name, email, lang, country)
 * @param {{resource?: {title: string, url: string}, detail?: string[]}} [opts]
 *   detail: lineas generadas por el servidor (nunca texto del visitante)
 * @returns {Promise<boolean>}
 */
export async function sendAutoReply(row, opts = {}) {
  const lang = row.lang === 'en' ? 'en' : 'es';
  const c = COPY[lang];
  const name = firstName(row.name);
  const booking = bookingUrl();
  const wa = (row.country === 'US' || (lang === 'en' && row.country !== 'CO')) ? WA.us : WA.co;
  const resource = opts.resource;
  const detail = Array.isArray(opts.detail) ? opts.detail : null;

  const paragraphs = [];
  const textLines = [c.hello(name), ''];
  if (detail) {
    paragraphs.push(`<p style="margin:0 0 12px;">${esc(c.thanksDetail)}</p>`,
      `<ul style="margin:0 0 24px;padding-left:20px;">${detail.map(l => `<li style="margin-bottom:6px;">${esc(l)}</li>`).join('')}</ul>`);
    textLines.push(c.thanksDetail, ...detail.map(l => '- ' + l), '');
  } else if (resource) {
    paragraphs.push(`<p style="margin:0 0 16px;">${esc(c.thanksResource)}</p>`,
      `<p style="margin:0 0 24px;">${button(resource.url, `${c.download}: ${resource.title}`)}</p>`);
    textLines.push(c.thanksResource, resource.url, '');
  } else {
    paragraphs.push(`<p style="margin:0 0 16px;">${esc(c.thanks)}</p>`);
    textLines.push(c.thanks, '');
  }
  if (booking) {
    paragraphs.push(`<p style="margin:0 0 12px;">${esc(c.next)}</p>`, `<p style="margin:0 0 24px;">${button(booking, c.book)}</p>`);
    textLines.push(c.next, booking, '');
  } else {
    paragraphs.push(`<p style="margin:0 0 12px;">${esc(c.nextWa)}</p>`, `<p style="margin:0 0 24px;">${button(wa, c.wa)}</p>`);
    textLines.push(c.nextWa, wa, '');
  }
  textLines.push(c.sign, c.tagline, SITE, '', c.footer);

  const html = `<!doctype html><html lang="${lang}"><body style="margin:0;padding:24px;background:#f8fafc;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#0f172a;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;border:1px solid #e2e8f0;font-size:15px;line-height:1.6;">
    <p style="margin:0 0 4px;color:#036F91;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Growing Solutions</p>
    <p style="margin:0 0 16px;font-weight:600;">${esc(c.hello(name))}</p>
    ${paragraphs.join('\n    ')}
    <p style="margin:0;font-weight:600;">${esc(c.sign)}</p>
    <p style="margin:0 0 20px;color:#64748b;font-size:13px;">${esc(c.tagline)} · <a href="${SITE}" style="color:#036F91;">growingsolutions.online</a></p>
    <p style="margin:0;color:#94a3b8;font-size:12px;">${esc(c.footer)}</p>
  </div></body></html>`;

  return sendEmail({
    to: [row.email],
    replyTo: process.env.LEAD_REPLY_TO || 'wilyer.arias@growingsolutions.online',
    subject: detail ? c.subjectDetail : resource ? c.subjectResource(resource.title) : c.subject,
    html,
    text: textLines.join('\n')
  });
}
