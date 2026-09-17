// Diagnostico del aviso por correo. Manda un correo de prueba a LEAD_NOTIFY_TO y
// devuelve el codigo y el mensaje de Resend, que es donde esta la causa real
// (dominio sin verificar, API key mala, remitente que no coincide).
//
// Protegido con CRON_SECRET: sin la cabecera correcta responde 401. No expone
// ningun valor de las variables, solo si existen.

import { createHash, timingSafeEqual } from 'node:crypto';

const digest = (v) => createHash('sha256').update(String(v)).digest();

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const secret = process.env.CRON_SECRET;
  if (!secret || !timingSafeEqual(digest(req.headers.authorization || ''), digest(`Bearer ${secret}`))) {
    return res.status(401).json({ ok: false });
  }

  const key = process.env.RESEND_API_KEY;
  const to = String(process.env.LEAD_NOTIFY_TO || '').split(',').map(s => s.trim()).filter(Boolean);
  const from = process.env.LEAD_NOTIFY_FROM || 'Growing Solutions <no-reply@growingsolutions.online>';

  const estado = {
    tieneApiKey: Boolean(key),
    apiKeyEmpiezaPorRe: Boolean(key && key.startsWith('re_')),
    destinatarios: to.length,
    remitente: from // no es secreto y suele ser la causa del fallo
  };

  if (!key || to.length === 0) {
    return res.status(503).json({ ok: false, motivo: 'faltan_variables', estado });
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        subject: 'Prueba de avisos — Growing Solutions',
        text: 'Si recibes este correo, los avisos de lead nuevo funcionan.'
      })
    });
    const cuerpo = await r.json().catch(() => ({}));
    return res.status(200).json({
      ok: r.ok,
      resendStatus: r.status,
      resendError: r.ok ? null : String(cuerpo?.message || cuerpo?.name || '').slice(0, 300),
      estado
    });
  } catch (err) {
    return res.status(502).json({ ok: false, motivo: err?.name || 'error_red', estado });
  }
}
