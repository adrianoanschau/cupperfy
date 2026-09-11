-- Convites tokenizados + check-in com múltiplos horários.
-- Acesso e gravação só via service_role no servidor (Next.js).

create table public.alpha_checkin_invites (
  id uuid primary key default gen_random_uuid(),
  token text not null,
  email text not null,
  name text,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  constraint alpha_checkin_invites_token_unique unique (token),
  constraint alpha_checkin_invites_email_unique unique (email),
  constraint alpha_checkin_invites_token_check check (char_length(token) between 20 and 128),
  constraint alpha_checkin_invites_email_check check (
    char_length(email) between 3 and 320
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  constraint alpha_checkin_invites_name_check check (
    name is null or char_length(name) between 1 and 120
  )
);

comment on table public.alpha_checkin_invites is
  'Convites pessoais de check-in — link /checkin/<token>.';

alter table public.alpha_checkin_invites enable row level security;

-- Ajusta checkins existentes para multi-slot + vínculo ao convite
alter table public.alpha_checkins
  drop constraint if exists alpha_checkins_email_unique;

alter table public.alpha_checkins
  add column if not exists invite_id uuid references public.alpha_checkin_invites (id) on delete cascade;

create unique index if not exists alpha_checkins_invite_slot_unique
  on public.alpha_checkins (invite_id, slot_id)
  where invite_id is not null;

create unique index if not exists alpha_checkins_email_slot_unique
  on public.alpha_checkins (email, slot_id);

-- Remove acesso anon (passa a ser só service_role no app)
drop policy if exists "alpha_checkins_insert_public" on public.alpha_checkins;
drop policy if exists "alpha_checkins_update_public" on public.alpha_checkins;

revoke all on table public.alpha_checkins from anon, authenticated;
revoke all on table public.alpha_checkin_invites from anon, authenticated;

grant all on table public.alpha_checkins to service_role;
grant all on table public.alpha_checkin_invites to service_role;
