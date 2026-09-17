// Aviso por correo cuando entra un lead nuevo (formulario o chatbot), via Resend.
//
// Es best-effort a proposito: el lead YA esta guardado en Supabase cuando esto
// corre, asi que si el correo falla no se pierde nada y el visitante igual ve
// exito. Los fallos quedan en los logs de Vercel, solo con el codigo de estado:
// el cuerpo de la respuesta puede repetir los datos del lead.

const ENDPOINT = 'https://api.resend.com/emails';
const DEFAULT_FROM = 'Growing Solutions <no-reply@growingsolutions.online>';

const esc = (v) => String(v ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ORIGEN = { form: 'Formulario de la web', chatbot: 'GS Bot (chat)' };

function fecha() {
  return new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota', dateStyle: 'full', timeStyle: 'short'
  });
}

function cuerpo(row) {
  const campos = [
    ['Nombre', row.name],
    ['Correo', row.email],
    ['Telefono', row.phone],
    ['Empresa', row.company],
    ['Sitio web', row.website],
    ['Presupuesto', row.budget],
    ['Servicio', row.service],
    ['Origen', ORIGEN[row.source] || row.source],
    ['Idioma', row.lang === 'en' ? 'Ingles' : 'Espanol'],
    ['Recibido', fecha()]
  ].filter(([, v]) => v);

  const filas = campos.map(([k, v]) => `
    <tr>
      <td style="padding:6px 12px 6px 0;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top;">${esc(k)}</td>
      <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;">${esc(v)}</td>
    </tr>`).join('');

  const notas = row.additional_info
    ? `<p style="margin:20px 0 6px;color:#64748b;font-size:13px;">Lo que necesita</p>
       <p style="margin:0;padding:12px 14px;background:#f1f5f9;border-radius:8px;color:#0f172a;font-size:14px;line-height:1.5;white-space:pre-wrap;">${esc(row.additional_info)}</p>`
    : '';

  const html = `<!doctype html><html lang="es"><body style="margin:0;padding:24px;background:#f8fafc;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;border:1px solid #e2e8f0;">
    <p style="margin:0 0 4px;color:#036F91;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Growing Solutions</p>
    <h1 style="margin:0 0 20px;color:#0f172a;font-size:20px;">Nuevo lead: ${esc(row.name)}</h1>
    <table style="border-collapse:collapse;width:100%;">${filas}</table>
    ${notas}
    <p style="margin:24px 0 0;font-size:14px;">
      <a href="mailto:${esc(row.email)}" style="color:#036F91;font-weight:600;">Responder por correo</a>
    </p>
    <p style="margin:16px 0 0;color:#94a3b8;font-size:12px;">
      Este lead ya quedo guardado en Supabase, tabla <code>leads</code>, en estado <code>nuevo</code>.
    </p>
  </div></body></html>`;

  const text = campos.map(([k, v]) => `${k}: ${v}`).join('\n') +
    (row.additional_info ? `\n\nLo que necesita:\n${row.additional_info}` : '');

  return { html, text };
}

/**
 * Manda el aviso. Nunca lanza: un fallo de correo no debe tumbar el lead.
 * Sin RESEND_API_KEY o LEAD_NOTIFY_TO no hace nada (el lead se guarda igual).
 */
export async function notifyLead(row) {
  const key = process.env.RESEND_API_KEY;
  const to = String(process.env.LEAD_NOTIFY_TO || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!key || to.length === 0) return;

  const { html, text } = cuerpo(row);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8_000);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LEAD_NOTIFY_FROM || DEFAULT_FROM,
        to,
        reply_to: row.email,
        subject: `Nuevo lead: ${row.name}${row.service ? ` — ${row.service}` : ''}`,
        html,
        text
      }),
      signal: ctrl.signal
    });
    if (!res.ok) console.error('[notify] Resend respondio', res.status);
  } catch (err) {
    console.error('[notify] Fallo al enviar el aviso:', err?.name || 'error');
  } finally {
    clearTimeout(timer);
  }
}
