// Calculadora de ahorro (/calculadora): envia el detalle por correo.
//
// Mismas defensas que /api/lead. Las cifras se RECALCULAN aqui a partir de los
// datos de entrada (acotados): nunca se usan numeros calculados por el
// navegador, asi el correo no puede llevar cifras arbitrarias.

import { originAllowed, rateLimited, clientIp } from './_lib/guard.js';
import { buildLead, configured, hashIp, insertLead, ipOverLimit, recentLeadsByEmail } from './_lib/leads-store.js';
import { sendAutoReply } from './_lib/autoreply.js';

const MAX_BODY_CHARS = 2_000;

const num = (v, min, max) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(Math.max(n, min), max) : null;
};

/** Mismo calculo que herramientas.js. */
export function calcular({ hours, rate, pct }) {
  const monthHours = hours * (pct / 100) * 52 / 12;
  return {
    monthHours,
    monthMoney: monthHours * rate,
    yearHours: monthHours * 12,
    yearMoney: monthHours * rate * 12
  };
}

function money(n, currency) {
  return currency === 'USD'
    ? 'US$' + Math.round(n).toLocaleString('en-US')
    : '$' + Math.round(n).toLocaleString('es-CO') + ' COP';
}

function detalle(input, r, lang) {
  const h = (n) => Math.round(n).toLocaleString(lang === 'en' ? 'en-US' : 'es-CO');
  return lang === 'en'
    ? [
      `Manual work: ${h(input.hours)} hours/week · cost per hour ${money(input.rate, input.currency)} · automatable share ${input.pct}%`,
      `Estimated savings per month: ${h(r.monthHours)} hours · ${money(r.monthMoney, input.currency)}`,
      `Estimated savings per year: ${h(r.yearHours)} hours · ${money(r.yearMoney, input.currency)}`,
      'Rough estimate based only on the numbers you entered; it is not a quote or a promise of results.'
    ]
    : [
      `Trabajo manual: ${h(input.hours)} horas/semana · costo por hora ${money(input.rate, input.currency)} · porcentaje automatizable ${input.pct} %`,
      `Ahorro estimado al mes: ${h(r.monthHours)} horas · ${money(r.monthMoney, input.currency)}`,
      `Ahorro estimado al año: ${h(r.yearHours)} horas · ${money(r.yearMoney, input.currency)}`,
      'Estimación aproximada basada solo en los datos que escribiste; no es una cotización ni una promesa de resultados.'
    ];
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'metodo_no_permitido' });
  }
  if (!originAllowed(req)) {
    return res.status(403).json({ error: 'origen_no_autorizado' });
  }
  if (!String(req.headers['content-type'] || '').includes('application/json')) {
    return res.status(415).json({ error: 'tipo_no_soportado' });
  }
  if (!configured()) {
    return res.status(503).json({ error: 'no_configurado' });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'rate_limit' });
  }

  const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (raw.length > MAX_BODY_CHARS) {
    return res.status(413).json({ error: 'demasiado_grande' });
  }
  let body = {};
  try { body = JSON.parse(raw) || {}; } catch { body = {}; }

  if (String(body.companyFax || '').trim() !== '') {
    return res.status(201).json({ ok: true, enviado: true });
  }
  if (body.consent !== true) {
    return res.status(422).json({ error: 'falta_consentimiento' });
  }

  const input = {
    hours: num(body.hours, 0, 168),
    rate: num(body.rate, 0, 10_000_000),
    pct: num(body.pct, 10, 90),
    currency: body.currency === 'USD' ? 'USD' : 'COP'
  };
  if (input.hours == null || input.rate == null || input.pct == null) {
    return res.status(400).json({ error: 'datos_invalidos' });
  }
  const lang = body.lang === 'en' ? 'en' : 'es';
  const lines = detalle(input, calcular(input), lang);

  const ipHash = hashIp(ip);
  const lead = buildLead({
    name: body.name,
    email: body.email,
    service: 'Automatización de procesos',
    additionalInfo: 'Calculadora de ahorro. ' + lines.slice(0, 3).join(' | ')
  }, { source: 'calculadora', lang, ipHash, consentVersion: 'calc-v1' });
  if (!lead.ok) {
    return res.status(400).json({ error: lead.reason });
  }

  if (await ipOverLimit(ipHash)) {
    return res.status(429).json({ error: 'rate_limit' });
  }
  const result = await insertLead(lead.row);
  if (!result.ok) {
    return res.status(502).json({ error: 'no_guardado' });
  }
  // Una respuesta automatica al dia por correo (ver autoreply.js): si ya hubo
  // otra hoy, el lead queda guardado pero no sale el correo, y se avisa.
  let enviado = false;
  if ((await recentLeadsByEmail(lead.row.email)) <= 1) {
    enviado = await sendAutoReply(lead.row, { detail: lines });
  }
  return res.status(201).json({ ok: true, enviado });
}
