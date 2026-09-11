-- Lista de interesse do alfa (landing pública).
-- INSERT público via anon; leitura só com service_role / Studio.

create table public.alpha_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  created_at timestamptz not null default now(),
  constraint alpha_waitlist_email_check check (
    char_length(email) between 3 and 320
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  constraint alpha_waitlist_name_check check (
    name is null or char_length(name) between 1 and 120
  )
);

create unique index alpha_waitlist_email_unique
  on public.alpha_waitlist (lower(email));

comment on table public.alpha_waitlist is
  'Interesse no acesso alfa — formulário da landing.';

alter table public.alpha_waitlist enable row level security;

create policy "alpha_waitlist_insert_public"
  on public.alpha_waitlist
  for insert
  to anon, authenticated
  with check (true);

grant insert on table public.alpha_waitlist to anon, authenticated;
grant select, update, delete on table public.alpha_waitlist to service_role;
