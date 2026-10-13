-- Seguridad (2026-10-13): la tabla keepalive conservaba todos los permisos para
-- anon y authenticated (incluido TRUNCATE, al que RLS no aplica). Ningun codigo
-- la usa: el cron /api/keepalive consulta leads con la clave secreta, que no
-- depende de estos permisos. Queda igual que leads: sin acceso publico.
revoke all on table public.keepalive from anon, authenticated;

-- Aplicada en produccion el 2026-10-13 (migracion keepalive_revoke_public_grants).
