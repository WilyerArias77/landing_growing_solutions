-- Formulario v2 (2026-10-13): país opcional del prospecto.
-- Aplicar ANTES de desplegar el código que envía `country` (api/_lib/leads-store.js);
-- si no, PostgREST rechaza la fila y el lead del formulario no se guarda.
-- Aditiva y nullable: no toca filas existentes ni el chatbot. RLS sigue igual
-- (activo y sin políticas: solo el servidor con la clave secreta escribe).
alter table public.leads
  add column if not exists country text
  constraint leads_country_check check (country in ('CO', 'US', 'OTRO'));

-- consent_version ya admite 'form-v2' (CHECK <= 20 caracteres).
