-- Formulario v2 (2026-10-13): país opcional del prospecto.
-- Aplicar ANTES de desplegar el código que envía `country` (api/_lib/leads-store.js);
-- si no, PostgREST rechaza la fila y el lead del formulario no se guarda.
-- Aditiva y nullable: no toca filas existentes ni el chatbot. RLS sigue igual
-- (activo y sin políticas: solo el servidor con la clave secreta escribe).
alter table public.leads
  add column if not exists country text
  constraint leads_country_check check (country in ('CO', 'US', 'OTRO'));

-- consent_version ya admite 'form-v2' (CHECK <= 20 caracteres).

-- Aviso del linter de Supabase: la funcion del event trigger ensure_rls no
-- debe poder ejecutarse por RPC. El trigger sigue funcionando sin este permiso.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

-- Aplicada en produccion el 2026-10-13 (migracion leads_country_and_revoke_rls_auto_enable).
