// Endpoint del formulario de contacto de la landing.
//
// Reemplaza el envio directo al Apps Script de Google: antes el navegador
// mandaba los datos por GET con mode:'no-cors', la respuesta era opaca y el
// visitante veia "exito" aunque el lead se perdiera. Ahora el navegador hace
// POST aqui (mismo origen), el servidor valida y guarda en Supabase, y la
// respuesta es real: 201 si quedo guardado, 4xx/5xx si no.

import { originAllowed, rateLimited, clientIp } from './_lib/guard.js';
import { buildLead, configured, hashIp, insertLead, ipOverLimit } from './_lib/leads-store.js';

const MAX_BODY_CHARS = 6_000;

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
  const body = safeParse(raw) || {};

  // Honeypot: un bot lo rellena. Respuesta identica al exito para no darle pistas.
  if (String(body.companyFax || '').trim() !== '') {
    return res.status(201).json({ ok: true });
  }

  // Ley 1581 de 2012: sin autorizacion expresa no se guarda el lead. La casilla
  // del formulario ya lo impide, pero el servidor no confia en el navegador.
  if (body.consent !== true) {
    return res.status(422).json({ error: 'falta_consentimiento' });
  }

  const ipHash = hashIp(ip);
  const lead = buildLead(body, {
    source: 'form', lang: body.lang, ipHash, consentVersion: 'form-v1'
  });
  if (!lead.ok) {
    return res.status(400).json({ error: lead.reason });
  }
  if (!String(body.budget || '').trim() || !String(body.service || '').trim()) {
    return res.status(400).json({ error: 'faltan_campos' });
  }

  if (await ipOverLimit(ipHash)) {
    return res.status(429).json({ error: 'rate_limit' });
  }

  const result = await insertLead(lead.row);
  if (!result.ok) {
    return res.status(502).json({ error: 'no_guardado' });
  }
  return res.status(201).json({ ok: true });
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}
