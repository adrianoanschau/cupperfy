-- Check-in de agenda do torneio alfa (link enviado aos interessados).
-- INSERT/UPDATE públicos via anon (upsert); leitura só service_role / Studio.

create table public.alpha_checkins (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  slot_id text not null,
  slot_label text not null,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint alpha_checkins_email_unique unique (email),
  constraint alpha_checkins_email_check check (
    char_length(email) between 3 and 320
    and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  ),
  constraint alpha_checkins_name_check check (
    name is null or char_length(name) between 1 and 120
  ),
  constraint alpha_checkins_slot_id_check check (char_length(slot_id) between 1 and 80),
  constraint alpha_checkins_slot_label_check check (char_length(slot_label) between 1 and 200),
  constraint alpha_checkins_note_check check (
    note is null or char_length(note) between 1 and 500
  )
);

comment on table public.alpha_checkins is
  'Confirmação de data/horário do torneio alfa — página /checkin.';

create or replace function public.set_alpha_checkins_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger alpha_checkins_set_updated_at
  before update on public.alpha_checkins
  for each row
  execute function public.set_alpha_checkins_updated_at();

alter table public.alpha_checkins enable row level security;

create policy "alpha_checkins_insert_public"
  on public.alpha_checkins
  for insert
  to anon, authenticated
  with check (true);

create policy "alpha_checkins_update_public"
  on public.alpha_checkins
  for update
  to anon, authenticated
  using (true)
  with check (true);

grant insert, update on table public.alpha_checkins to anon, authenticated;
grant select, delete on table public.alpha_checkins to service_role;
