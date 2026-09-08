// Endpoint del chatbot de soporte de Growing Solutions.
//
// Es el UNICO lugar donde existe la API key de OpenAI: llega por variable de
// entorno y jamas se envia al navegador. El widget (chat.js) solo habla con este
// endpoint, en el mismo origen.
//
// Responde por SSE para que el texto aparezca palabra por palabra, como en ChatGPT.

import OpenAI from 'openai';
import { getSystemPrompt, promptsLoaded } from './_lib/prompt.js';
import { leadTool, submitLead } from './_lib/lead.js';
import {
  originAllowed, rateLimited, clientIp, sanitizeMessages
} from './_lib/guard.js';

const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const MAX_OUTPUT_TOKENS = Number(process.env.OPENAI_MAX_TOKENS || 600);
const TEMPERATURE = Number(process.env.OPENAI_TEMPERATURE || 0.4);
const MAX_TOOL_ROUNDS = 2;

export default async function handler(req, res) {
  // Diagnostico: dice si falta configuracion, sin exponer ningun secreto.
  // Solo se publican NOMBRES de variables y booleanos, nunca valores.
  if (req.method === 'GET') {
    const clave = process.env.OPENAI_API_KEY;
    return res.status(200).json({
      ok: true,
      model: MODEL,
      apiKeyConfigurada: Boolean(clave),
      apiKeyLongitud: clave ? clave.length : 0,
      promptsCargados: promptsLoaded(),
      // Que commit y que entorno estan sirviendo de verdad
      commit: (process.env.VERCEL_GIT_COMMIT_SHA || 'desconocido').slice(0, 7),
      entorno: process.env.VERCEL_ENV || 'desconocido',
      // Nombres parecidos, para cazar erratas y espacios sobrantes
      variablesVistas: Object.keys(process.env)
        .filter(k => /OPENAI|APPS_SCRIPT/i.test(k))
        .map(k => JSON.stringify(k)),
      // Que PROYECTO de Vercel sirve el dominio. Dos proyectos distintos pueden
      // estar conectados al mismo repo y construir el mismo commit, asi que el
      // commit por si solo no identifica el proyecto.
      proyecto: process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'desconocido',
      // Cuantas variables propias hay (las del sistema empiezan por VERCEL_/AWS_)
      variablesPropias: Object.keys(process.env)
        .filter(k => !/^(VERCEL_|AWS_|LAMBDA_|_|NODE_|PATH$|HOME$|LANG$|TZ$)/.test(k)).length
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Metodo no permitido' });
  }

  if (!originAllowed(req)) {
    return res.status(403).json({ error: 'Origen no autorizado' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: 'no_configurado' });
  }

  if (rateLimited(clientIp(req))) {
    return res.status(429).json({ error: 'rate_limit' });
  }

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  const messages = sanitizeMessages(body.messages);
  if (messages.length === 0) {
    return res.status(400).json({ error: 'sin_mensajes' });
  }

  const lang = body.lang === 'en' ? 'en' : 'es';
  const leadYaRegistrado = Boolean(body.leadRegistrado);

  // Cabeceras SSE. Sin Content-Length para que Vercel no bufferice la respuesta.
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no'
  });
  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // El contexto de sesion va como mensaje de sistema aparte: nada de lo que
  // escribe el visitante entra nunca con rol system.
  const convo = [
    { role: 'system', content: getSystemPrompt() },
    {
      role: 'system',
      content:
        `Contexto de esta sesion: el sitio esta en ${lang === 'en' ? 'ingles' : 'espanol'}. ` +
        `Responde en el idioma del ultimo mensaje del visitante. ` +
        (leadYaRegistrado
          ? 'Los datos de esta persona YA fueron registrados: no vuelvas a pedirlos ni llames a registrar_lead.'
          : 'Aun no se han registrado sus datos.')
    },
    ...messages
  ];

  let leadRegistrado = leadYaRegistrado;
  let algoEscrito = false;

  try {
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const stream = await client.chat.completions.create({
        model: MODEL,
        messages: convo,
        tools: leadRegistrado ? undefined : [leadTool],
        temperature: TEMPERATURE,
        max_tokens: MAX_OUTPUT_TOKENS,
        stream: true
      });

      let texto = '';
      const toolCalls = [];
      let finish = null;

      for await (const chunk of stream) {
        const choice = chunk.choices?.[0];
        if (!choice) continue;

        const deltaText = choice.delta?.content;
        if (deltaText) {
          texto += deltaText;
          algoEscrito = true;
          send({ type: 'delta', text: deltaText });
        }

        for (const tc of choice.delta?.tool_calls || []) {
          const i = tc.index ?? 0;
          toolCalls[i] ||= { id: '', type: 'function', function: { name: '', arguments: '' } };
          if (tc.id) toolCalls[i].id = tc.id;
          if (tc.function?.name) toolCalls[i].function.name += tc.function.name;
          if (tc.function?.arguments) toolCalls[i].function.arguments += tc.function.arguments;
        }

        if (choice.finish_reason) finish = choice.finish_reason;
      }

      if (finish !== 'tool_calls' || toolCalls.length === 0) break;

      convo.push({ role: 'assistant', content: texto || null, tool_calls: toolCalls });

      for (const call of toolCalls) {
        let resultado;
        if (call.function.name === 'registrar_lead' && !leadRegistrado) {
          const args = safeParse(call.function.arguments) || {};
          const r = await submitLead(args);
          if (r.ok) {
            leadRegistrado = true;
            send({ type: 'lead', ok: true });
            resultado = { ok: true, mensaje: 'Lead registrado. Un asesor lo contactara en menos de 24 horas.' };
          } else {
            send({ type: 'lead', ok: false });
            resultado = {
              ok: false,
              mensaje: 'No se pudo registrar. Disculpate en una linea y entrega el WhatsApp y el correo. No reintentes.'
            };
          }
        } else {
          resultado = { ok: false, mensaje: 'Herramienta no disponible.' };
        }
        convo.push({
          role: 'tool',
          tool_call_id: call.id,
          content: JSON.stringify(resultado)
        });
      }
    }

    send({ type: 'done', leadRegistrado });
  } catch (err) {
    // El detalle queda en los logs de Vercel; al visitante nunca le llega el motivo.
    console.error('[chat] Error:', err?.status || '', err?.message || err);
    send({ type: 'error', recuperable: algoEscrito });
  } finally {
    res.end();
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}

