// Carga los prompts editables desde /prompts. Los archivos .md son la fuente de
// verdad del comportamiento del bot: se editan sin tocar codigo y se publican con
// cada push. Ver CHATBOT.md.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));

// En local la funcion corre desde src/api/_lib; en Vercel el bundle conserva la
// ruta relativa al root del proyecto. Se prueban ambas y se usa la primera que exista.
const CANDIDATES = [
  join(HERE, '..', '..', 'prompts'),
  join(process.cwd(), 'prompts'),
  join(process.cwd(), 'src', 'prompts')
];

const FILES = ['system.md', 'knowledge.md', 'scripts.md'];

// Respaldo minimo: si los .md no viajaron en el bundle, el bot sigue respondiendo
// dentro de su rol en vez de caerse o inventar.
const FALLBACK = [
  'Eres GS Bot, el asistente virtual de Growing Solutions (contabilidad, finanzas,',
  'automatizacion de procesos y desarrollo de software para pymes en Colombia y',
  'Estados Unidos). Responde solo sobre Growing Solutions, en el idioma del visitante,',
  'en 2 a 5 frases. No inventes precios ni datos: para cualquier detalle concreto',
  'deriva a WhatsApp Colombia +57 324 275 4406, WhatsApp USA +1 917 227 2181 o',
  'wilyer.arias@growingsolutions.online. La asesoria inicial es gratuita.'
].join(' ');

let cached = null;

function readAll() {
  for (const dir of CANDIDATES) {
    try {
      const parts = FILES.map(f => readFileSync(join(dir, f), 'utf8').trim());
      if (parts.every(p => p.length > 0)) return parts.join('\n\n---\n\n');
    } catch {
      // Ruta no valida en este entorno: se prueba la siguiente.
    }
  }
  return null;
}

/**
 * Devuelve el system prompt completo (system + knowledge + scripts).
 * Se cachea en memoria del modulo: se relee cuando Vercel arranca una instancia
 * nueva, es decir, en cada despliegue.
 */
export function getSystemPrompt() {
  if (cached) return cached;
  const loaded = readAll();
  if (!loaded) {
    console.error('[chat] No se pudieron leer los prompts de /prompts; usando respaldo.');
    cached = FALLBACK;
  } else {
    cached = loaded;
  }
  return cached;
}

/** true si los .md se cargaron bien (lo usa el healthcheck). */
export function promptsLoaded() {
  return readAll() !== null;
}
