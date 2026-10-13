-- Fase 2.6 (2026-10-13): leads que descargan un recurso en /recursos.
-- Aplicar ANTES de desplegar api/recurso.js; si no, el CHECK rechaza la fila.
-- Solo amplia los valores permitidos de `source`; no toca filas existentes.
-- RLS sigue igual (activo y sin politicas: solo el servidor escribe).
alter table public.leads drop constraint leads_source_check;
alter table public.leads add constraint leads_source_check
  check (source in ('form', 'chatbot', 'recurso'));
