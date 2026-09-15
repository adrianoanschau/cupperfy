-- Identidade MVP (docs/02 + docs/04): profiles, papéis, sports e competições x1.
-- Trigger de profiles no signup. RLS: leitura pública, escrita do dono.

create table public.sports (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  slug text not null,
  constraint sports_slug_unique unique (slug)
);

create table public.competition_formats (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  params jsonb not null default '{}'::jsonb
);

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  constraint profiles_user_id_unique unique (user_id),
  constraint profiles_display_name_check check (char_length(display_name) between 1 and 80)
);

create table public.player_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  sport_id uuid not null references public.sports (id),
  position text,
  stats jsonb not null default '{}'::jsonb,
  constraint player_profiles_profile_sport_unique unique (profile_id, sport_id)
);

create table public.organizer_profiles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  verified boolean not null default false,
  constraint organizer_profiles_profile_unique unique (profile_id)
);

create table public.competitions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sport_id uuid not null references public.sports (id),
  organizer_id uuid not null references public.organizer_profiles (id),
  format_id uuid not null references public.competition_formats (id),
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint competitions_status_check check (
    status in ('draft', 'registration', 'in_progress', 'completed', 'cancelled')
  )
);

create table public.competition_entries (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions (id) on delete cascade,
  player_id uuid not null references public.player_profiles (id),
  seed int,
  status text not null default 'pending',
  constraint competition_entries_status_check check (
    status in ('pending', 'approved', 'rejected', 'withdrawn')
  )
);

create unique index competition_entries_player_unique
  on public.competition_entries (competition_id, player_id);

insert into public.sports (name, category, slug)
values ('Futebol e-sports', 'esports', 'futebol-esports');

insert into public.competition_formats (type, params)
values (
  'single_elimination',
  '{"participant_type":"player","participant_count":8,"best_of":1,"seeding":"manual"}'::jsonb
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  chosen_name text;
begin
  chosen_name := nullif(
    trim(
      coalesce(
        meta ->> 'display_name',
        meta ->> 'full_name',
        meta ->> 'name',
        ''
      )
    ),
    ''
  );

  if chosen_name is null then
    chosen_name := split_part(coalesce(new.email, 'jogador'), '@', 1);
  end if;

  insert into public.profiles (user_id, display_name, avatar_url)
  values (
    new.id,
    left(chosen_name, 80),
    nullif(
      coalesce(meta ->> 'avatar_url', meta ->> 'picture', meta ->> 'avatar'),
      ''
    )
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.auth_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.profiles where user_id = auth.uid()
$$;

create or replace function public.auth_player_profile_id(p_sport_id uuid default null)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select pp.id
  from public.player_profiles pp
  where pp.profile_id = public.auth_profile_id()
    and (p_sport_id is null or pp.sport_id = p_sport_id)
  limit 1
$$;

create or replace function public.is_competition_organizer(p_competition_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.competitions c
    join public.organizer_profiles op on op.id = c.organizer_id
    where c.id = p_competition_id
      and op.profile_id = public.auth_profile_id()
  )
$$;

alter table public.sports enable row level security;
alter table public.competition_formats enable row level security;
alter table public.profiles enable row level security;
alter table public.player_profiles enable row level security;
alter table public.organizer_profiles enable row level security;
alter table public.competitions enable row level security;
alter table public.competition_entries enable row level security;

create policy "sports_select_public"
  on public.sports for select using (true);

create policy "formats_select_public"
  on public.competition_formats for select using (true);

create policy "profiles_select_public"
  on public.profiles for select using (true);

create policy "profiles_update_own"
  on public.profiles for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "player_profiles_select_public"
  on public.player_profiles for select using (true);

create policy "player_profiles_insert_own"
  on public.player_profiles for insert
  with check (profile_id = public.auth_profile_id());

create policy "player_profiles_update_own"
  on public.player_profiles for update
  using (profile_id = public.auth_profile_id())
  with check (profile_id = public.auth_profile_id());

create policy "player_profiles_delete_own"
  on public.player_profiles for delete
  using (profile_id = public.auth_profile_id());

create policy "organizer_profiles_select_public"
  on public.organizer_profiles for select using (true);

create policy "organizer_profiles_insert_own"
  on public.organizer_profiles for insert
  with check (profile_id = public.auth_profile_id());

create policy "organizer_profiles_update_own"
  on public.organizer_profiles for update
  using (profile_id = public.auth_profile_id())
  with check (profile_id = public.auth_profile_id());

create policy "organizer_profiles_delete_own"
  on public.organizer_profiles for delete
  using (profile_id = public.auth_profile_id());

create policy "competitions_select_public"
  on public.competitions for select using (true);

create policy "competitions_insert_organizer"
  on public.competitions for insert
  with check (
    organizer_id in (
      select id from public.organizer_profiles where profile_id = public.auth_profile_id()
    )
  );

create policy "competitions_update_organizer"
  on public.competitions for update
  using (public.is_competition_organizer(id))
  with check (public.is_competition_organizer(id));

create policy "competitions_delete_organizer"
  on public.competitions for delete
  using (public.is_competition_organizer(id));

create policy "entries_select_public"
  on public.competition_entries for select using (true);

create policy "entries_insert_self_or_org"
  on public.competition_entries for insert
  with check (
    player_id = public.auth_player_profile_id()
    or public.is_competition_organizer(competition_id)
  );

create policy "entries_update_org_or_self"
  on public.competition_entries for update
  using (
    public.is_competition_organizer(competition_id)
    or player_id = public.auth_player_profile_id()
  );

grant select on table public.sports to anon, authenticated;
grant select on table public.competition_formats to anon, authenticated;
grant select on table public.profiles to anon, authenticated;
grant update on table public.profiles to authenticated;
grant select on table public.player_profiles to anon, authenticated;
grant insert, update, delete on table public.player_profiles to authenticated;
grant select on table public.organizer_profiles to anon, authenticated;
grant insert, update, delete on table public.organizer_profiles to authenticated;
grant select on table public.competitions to anon, authenticated;
grant insert, update, delete on table public.competitions to authenticated;
grant select on table public.competition_entries to anon, authenticated;
grant insert, update on table public.competition_entries to authenticated;
