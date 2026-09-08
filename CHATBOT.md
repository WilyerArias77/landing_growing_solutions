# GS Bot — manual del chatbot

Asistente de soporte de la landing de Growing Solutions. Responde sobre los
servicios, deriva a WhatsApp y captura leads en la misma Google Sheet del
formulario.

---

## 1. Lo primero: la API key

El chatbot no funciona hasta que exista la variable `OPENAI_API_KEY`.

1. Crea la key en <https://platform.openai.com/api-keys>.
2. Ponle saldo a la cuenta y, muy recomendable, **un límite de gasto mensual**
   en *Settings → Limits*. Es la única protección real contra una sorpresa en la
   factura.
3. Cárgala en Vercel: proyecto `growingsolutions` → **Settings → Environment
   Variables** → `OPENAI_API_KEY` → aplícala a *Production*, *Preview* y
   *Development* → **Redeploy**.

**Nunca** pongas la key en un archivo del repositorio. Vive solo en Vercel.

### Comprobar que quedó bien

Abre en el navegador:

```
https://www.growingsolutions.online/api/chat
```

Debe responder algo así:

```json
{ "ok": true, "model": "gpt-4.1-mini", "apiKeyConfigurada": true, "promptsCargados": true }
```

Si `apiKeyConfigurada` es `false`, falta la variable o falta redesplegar.
Si `promptsCargados` es `false`, los `.md` no viajaron en el bundle: revisa
`functions.includeFiles` en `vercel.json`.

---

## 2. Cómo cambiar lo que dice el bot

Aquí está el 90% de lo que vas a tocar. Son tres archivos de texto en
`src/prompts/`:

| Archivo | Qué controla | Cuándo editarlo |
|---|---|---|
| `system.md` | Quién es, qué reglas obedece, tono, idioma | Cambiar la personalidad o poner un límite nuevo |
| `knowledge.md` | Los datos: servicios, metodología, contacto, FAQ, precios | **Cambió un servicio, un teléfono, un dato** |
| `scripts.md` | Guiones: saludo, precios, objeciones, derivación, captura del lead | Afinar cómo vende y cómo pide los datos |

Los tres se concatenan y se envían como instrucciones del sistema en cada
conversación.

### El flujo de trabajo

```bash
# 1. editas el .md
# 2. publicas
git add prompts/
git commit -m "Ajustar el guion de precios del chatbot"
git push
```

Vercel despliega en menos de un minuto y el bot en producción ya responde
distinto. **No hay que tocar código.**

### Reglas al escribir los prompts

- Lo que no esté en `knowledge.md`, el bot no lo sabe — y tiene instrucción de no
  inventarlo. Si quieres que responda algo nuevo, agrégalo ahí.
- Sé concreto y en imperativo: "Nunca des una cifra de precio" funciona mejor que
  "trata de evitar hablar de precios".
- Después de cada cambio, **pruébalo**: abre el chat y hazle 3 o 4 preguntas
  reales, incluida una que intente sacarlo de su rol.
- Cambiar el nombre del bot exige tocar también `chat.js` (bloque `I18N`), que es
  donde vive el saludo del widget y el encabezado.

---

## 3. Estructura

```
src/
├── prompts/              ← lo que editas tú
│   ├── system.md
│   ├── knowledge.md
│   └── scripts.md
├── api/
│   ├── chat.js           ← función serverless: la única que ve la API key
│   └── _lib/
│       ├── prompt.js     ← arma el system prompt desde los .md
│       ├── lead.js       ← manda el lead a la Google Sheet + define la herramienta
│       └── guard.js      ← rate limit, origen permitido, límites de tamaño
├── chat.js               ← widget del navegador
├── chat.css              ← estilos del widget
└── index.html            ← carga chat.css y chat.js
```

Nada del directorio `api/` llega al navegador. Los archivos con `_` delante no se
publican como endpoints.

---

## 4. Probar en tu equipo

```bash
cd src
npm install          # ya hecho
```

Crea un archivo `.env` en `src/` (está en `.gitignore`, no se sube):

```
OPENAI_API_KEY=sk-proj-...
```

Y levanta el entorno con las funciones incluidas:

```bash
npm run dev          # equivale a: vercel dev
```

Abre <http://localhost:3000>. **Ojo:** con `npx serve` o abriendo el `index.html`
directamente, el widget aparece pero `/api/chat` no existe y el chat responde
"no pude conectarme". Las funciones solo corren con `vercel dev`.

---

## 5. Configuración por variables de entorno

| Variable | Por defecto | Para qué |
|---|---|---|
| `OPENAI_API_KEY` | — | **Obligatoria** |
| `OPENAI_MODEL` | `gpt-4.1-mini` | Cambiar de modelo sin tocar código |
| `OPENAI_MAX_TOKENS` | `600` | Techo de longitud de cada respuesta |
| `OPENAI_TEMPERATURE` | `0.4` | 0 = literal, 1 = más suelto |
| `APPS_SCRIPT_URL` | la del formulario | Solo si cambia el despliegue del Apps Script |

Cambiar cualquiera exige **redeploy** en Vercel.

---

## 6. Los leads del chat

Cuando el visitante acepta que lo contacten, el bot llama a la herramienta
`registrar_lead` y el servidor manda los datos al **mismo Apps Script del
formulario**, así que caen en la **misma Google Sheet**.

Se distinguen porque la columna de información adicional empieza con `[Chatbot]`.

Tres cosas que conviene recordar (ya nos costaron una sesión entera):

1. El Apps Script solo implementa `doGet`. El envío **debe** ser GET con query
   params. Un POST devuelve 200 con una página HTML de error de Google.
2. Cada nuevo despliegue del Apps Script genera una **URL `/exec` distinta**. Si
   la cambias, actualiza `APPS_SCRIPT_URL` (o la constante en `api/_lib/lead.js`)
   **y** la de `script.js`.
3. Diagnostica siempre con `curl` antes de tocar el front:
   `{"status":"ok"}` = el script corre; una página HTML = el método está mal.

---

## 7. Costos y controles

- Modelo por defecto `gpt-4.1-mini`. El prompt del sistema pesa **~3 200 tokens**
  y se envía en cada mensaje (OpenAI lo cachea automáticamente, lo que abarata
  las repeticiones dentro de una misma conversación).
- Consulta la tarifa vigente en <https://openai.com/api/pricing/>; con este
  tamaño de prompt, una conversación de soporte queda en el orden de fracciones
  de centavo de dólar.
- Frenos ya implementados:
  - Solo acepta peticiones desde `growingsolutions.online` (cabecera `Origin`).
  - 25 mensajes por IP cada 10 minutos.
  - 1 500 caracteres por mensaje, 20 turnos y 12 000 caracteres de historial.
  - Tope de tokens por respuesta.
- Freno que **debes poner tú**: el límite de gasto mensual en la consola de
  OpenAI. El rate limit vive en memoria de cada instancia serverless, así que es
  un freno, no una garantía.

---

## 8. Si algo falla

| Síntoma | Causa probable |
|---|---|
| "El asistente no está disponible" | Falta `OPENAI_API_KEY` o falta redesplegar |
| "Hay muchas consultas" | Rate limit: 25 mensajes / 10 min por IP |
| "No pude conectarme" | Error de red, o saldo agotado en OpenAI (revisa los logs) |
| El bot inventa datos | Falta el dato en `knowledge.md`, o el `system.md` perdió la regla |
| El lead no llega a la Sheet | Cambió la URL `/exec` del Apps Script (ver §6) |

Los logs con el detalle real están en Vercel → proyecto → **Logs**, filtrando por
`/api/chat`. El visitante nunca ve el motivo del error, solo el mensaje amable
con el WhatsApp.
