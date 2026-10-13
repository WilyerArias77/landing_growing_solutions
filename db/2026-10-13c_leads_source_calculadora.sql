-- Fase 3.2 (2026-10-13): leads de la calculadora de ahorro (/calculadora).
-- Aplicar ANTES de desplegar api/calculadora.js; si no, el CHECK rechaza la fila.
-- Solo amplia los valores permitidos de `source`; no toca filas existentes.
alter table public.leads drop constraint leads_source_check;
alter table public.leads add constraint leads_source_check
  check (source in ('form', 'chatbot', 'recurso', 'calculadora'));
