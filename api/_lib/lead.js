// Guarda en Supabase los datos que el visitante entrega dentro del chat.
// Usa la misma tabla y la misma validacion que el formulario (leads-store.js),
// marcando source='chatbot' para distinguir el origen.

import { buildLead, configured, hashIp, insertLead, ipOverLimit } from './leads-store.js';

/**
 * @param {object} data argumentos de la herramienta registrar_lead
 * @param {{ip?: string, lang?: string}} ctx
 * @returns {Promise<{ok: boolean, reason?: string}>}
 */
export async function submitLead(data, ctx = {}) {
  if (!configured()) return { ok: false, reason: 'no_configurado' };
  const ipHash = hashIp(ctx.ip);
  const lead = buildLead({
    name: data.nombre,
    email: data.email,
    phone: data.telefono,
    company: data.empresa,
    budget: data.presupuesto || 'Por definir',
    service: data.servicio || 'Sin especificar',
    additionalInfo: data.necesidad
  }, { source: 'chatbot', lang: ctx.lang, ipHash, consentVersion: 'chat-v1' });

  if (!lead.ok) return lead;
  if (await ipOverLimit(ipHash)) return { ok: false, reason: 'rate_limit' };
  return insertLead(lead.row);
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
