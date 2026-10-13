// Descarga de recursos a cambio de nombre y correo (/recursos).
//
// Mismas defensas que /api/lead: origen, rate limit en memoria y en la base,
// honeypot, consentimiento obligatorio y validacion en el servidor. El lead se
// guarda con source='recurso' y el enlace se entrega en la respuesta y por
// correo. Solo se entregan recursos listados en content/recursos.js con archivo.

import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { originAllowed, rateLimited, clientIp } from './_lib/guard.js';
import { buildLead, configured, hashIp, insertLead, ipOverLimit, recentLeadsByEmail } from './_lib/leads-store.js';
import { sendAutoReply } from './_lib/autoreply.js';

const SITE = 'https://www.growingsolutions.online';
const MAX_BODY_CHARS = 2_000;

/** Recursos publicados (con archivo local), leidos de content/recursos.js. */
function loadResources() {
  try {
    const sandbox = { window: {} };
    vm.runInNewContext(readFileSync(new URL('../content/recursos.js', import.meta.url), 'utf8'), sandbox);
    return (sandbox.window.GS_RECURSOS || []).filter(r =>
      r && typeof r.id === 'string' && typeof r.archivo === 'string' && /^\/recursos\/archivos\/[\w.-]+$/.test(r.archivo));
  } catch (err) {
    console.error('[recurso] No se pudo leer content/recursos.js:', err?.name || 'error');
    return [];
  }
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

  const resource = loadResources().find(r => r.id === String(body.resource || ''));
  if (!resource) {
    return res.status(404).json({ error: 'recurso_no_disponible' });
  }
  const lang = body.lang === 'en' ? 'en' : 'es';
  const title = (resource.titulo && resource.titulo[lang]) || resource.id;
  const url = SITE + resource.archivo;

  // Honeypot: respuesta identica al exito, sin guardar ni enviar nada.
  if (String(body.companyFax || '').trim() !== '') {
    return res.status(201).json({ ok: true, url });
  }
  if (body.consent !== true) {
    return res.status(422).json({ error: 'falta_consentimiento' });
  }

  const ipHash = hashIp(ip);
  const lead = buildLead({
    name: body.name,
    email: body.email,
    additionalInfo: `Descarga: ${title}`
  }, { source: 'recurso', lang, ipHash, consentVersion: 'recurso-v1' });
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
  if ((await recentLeadsByEmail(lead.row.email)) <= 1) {
    await sendAutoReply(lead.row, { resource: { title, url } });
  }
  return res.status(201).json({ ok: true, url });
}
