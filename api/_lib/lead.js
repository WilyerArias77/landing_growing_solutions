// Envia al sistema de leads los datos que el visitante entrega dentro del chat.
// Reutiliza el MISMO Apps Script del formulario de la landing, asi que los leads
// del chatbot caen en la misma Google Sheet sin tocar el script de Google.
//
// IMPORTANTE: el despliegue del Apps Script solo implementa doGet(e). Un POST
// devuelve 200 con una pagina HTML de error de Google, no un 405. Por eso aqui
// se usa GET con query params y se verifica el cuerpo de la respuesta.

const DEFAULT_URL = 'https://script.google.com/macros/s/AKfycbyLkceuF5j8RKz2LCPCHN55CE-4n569jEMXyBswVEYAjI1H4_BM1p5DlMQBwrsV0l55AQ/exec';

const MAX = {
  name: 80, phone: 25, email: 120, company: 120,
  website: 200, budget: 60, service: 60, additionalInfo: 2000
};

const clamp = (v, max) => String(v ?? '').trim().slice(0, max);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @returns {Promise<{ok: boolean, reason?: string}>}
 */
export async function submitLead(data) {
  const url = process.env.APPS_SCRIPT_URL || DEFAULT_URL;

  const name = clamp(data.nombre, MAX.name);
  const email = clamp(data.email, MAX.email);

  if (!name) return { ok: false, reason: 'falta_nombre' };
  if (!EMAIL_RE.test(email)) return { ok: false, reason: 'email_invalido' };

  // Deja rastro del origen en la hoja para distinguirlo del formulario.
  const notes = clamp(data.necesidad, MAX.additionalInfo - 12);
  const target = new URL(url);
  target.searchParams.set('name', name);
  target.searchParams.set('email', email);
  target.searchParams.set('phone', clamp(data.telefono, MAX.phone));
  target.searchParams.set('company', clamp(data.empresa, MAX.company));
  target.searchParams.set('website', '');
  target.searchParams.set('budget', clamp(data.presupuesto, MAX.budget) || 'Por definir');
  target.searchParams.set('service', clamp(data.servicio, MAX.service) || 'Sin especificar');
  target.searchParams.set('additionalInfo', `[Chatbot] ${notes}`.trim());

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10_000);

  try {
    const res = await fetch(target.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal
    });
    const body = (await res.text()).slice(0, 500);

    // El script responde {"status":"ok"}. Una pagina HTML significa que el
    // despliegue cambio de URL o que el metodo no es el correcto.
    if (!res.ok || /<html/i.test(body)) {
      console.error('[lead] Respuesta inesperada de Apps Script:', res.status, body.slice(0, 200));
      return { ok: false, reason: 'apps_script_error' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[lead] Fallo al enviar el lead:', err?.name || err);
    return { ok: false, reason: 'network' };
  } finally {
    clearTimeout(timer);
  }
}

/** Definicion de la herramienta que se expone al modelo. */
export const leadTool = {
  type: 'function',
  function: {
    name: 'registrar_lead',
    description:
      'Registra los datos de un visitante interesado para que un asesor de Growing ' +
      'Solutions lo contacte. Usala UNA sola vez por conversacion y solo cuando ya ' +
      'tengas nombre y correo y la persona haya aceptado que la contacten.',
    parameters: {
      type: 'object',
      properties: {
        nombre: { type: 'string', description: 'Nombre de la persona' },
        email: { type: 'string', description: 'Correo electronico de contacto' },
        telefono: { type: 'string', description: 'Telefono o WhatsApp. Opcional.' },
        empresa: { type: 'string', description: 'Nombre de la empresa. Opcional.' },
        servicio: {
          type: 'string',
          description: 'Linea de interes',
          enum: [
            'Servicios Contables',
            'Servicios Financieros',
            'Automatizacion de Procesos',
            'Desarrollos a la Medida',
            'Varios',
            'Sin especificar'
          ]
        },
        presupuesto: { type: 'string', description: 'Presupuesto si lo menciono. Opcional.' },
        necesidad: {
          type: 'string',
          description: 'Resumen en 1-2 frases de lo que necesita, en sus propias palabras.'
        }
      },
      required: ['nombre', 'email'],
      additionalProperties: false
    }
  }
};
