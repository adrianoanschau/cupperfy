# 04 — Autenticação e Políticas RLS

> Parte da documentação de arquitetura da Plataforma de Gestão de Competições. Ver [README.md](../README.md) para o índice completo. Ver também: [02-modelagem-de-dados.md](./02-modelagem-de-dados.md).

## Autenticação

- **Supabase Auth**: e-mail/senha + OAuth. No MVP: e-mail/senha + **Discord** (e Google se for barato).
- Após signup: trigger cria `profiles`; onboarding cria `player_profiles` e/ou `organizer_profiles`.

## Autorização (RLS)

No lançamento **x1**, o que importa:

- Organizador edita só competições em que é o `organizer_id`
- Jogador só cria/edita a **própria** inscrição (`competition_entries.player_id` → seu `player_profiles`)
- Perfis: leitura pública, edição só do dono

Times/`team_members`: policies podem existir no schema, mas não são o fluxo crítico. Transfers/social: Fase 2.

## Matriz de permissões — Fase 1 (MVP x1)

| Recurso | SELECT | INSERT | UPDATE | DELETE |
|---|---|---|---|---|
| `profiles` | Público | Trigger no signup | Dono | — |
| `player_profiles` / `organizer_profiles` (/ `staff_profiles`) | Público | Dono do profile | Dono | Dono |
| `sports` / `competition_formats` | Público | Service role / seed | Service role | — |
| `competitions` | Público | Quem tem `organizer_profiles` (e `organizer_id` = o dele) | Organizador dono | Organizador dono |
| `competition_entries` | Público | **O próprio jogador** (seu `player_id`) ou organizador | Org aprova/rejeita; jogador só `withdrawn` na própria | — (`status`) |
| `matches` | Público | Sistema (gerar chave) / organizador | Organizador (placar via RPC) | Organizador |
| `teams` / `team_members` | Público | Autenticado / staff (opcional no lançamento) | Staff/owner | Owner |
| `standings` / `transfers` / social | — | **Fora do MVP** | — | — |

Decisões:

- Geração de chave e placar: RPC `security definer` (`generate_bracket`, `report_match_result`) com checagem de organizador.
- Placar: `score_*` + `winner_player_id` + `status = completed`; RPC promove vencedor em `next_match_id`.

## Função auxiliar

```sql
create or replace function auth_profile_id()
returns uuid
language sql stable
security definer
set search_path = public
as $$
  select id from profiles where user_id = auth.uid()
$$;

create or replace function auth_player_profile_id(p_sport_id uuid default null)
returns uuid
language sql stable
security definer
set search_path = public
as $$
  select pp.id from player_profiles pp
  where pp.profile_id = auth_profile_id()
    and (p_sport_id is null or pp.sport_id = p_sport_id)
  limit 1
$$;

create or replace function is_competition_organizer(p_competition_id uuid)
returns boolean
language sql stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from competitions c
    join organizer_profiles op on op.id = c.organizer_id
    where c.id = p_competition_id
      and op.profile_id = auth_profile_id()
  )
$$;
```

(`is_team_staff` continua útil quando times entrarem no fluxo; ver final do doc.)

## Exemplos de policies (MVP x1)

**`competitions`** — igual ao desenho anterior (insert/update só do organizador dono).

**`competition_entries`** — jogador se inscreve; org aprova:

```sql
alter table competition_entries enable row level security;

create policy "entries_select_public"
  on competition_entries for select using (true);

create policy "entries_insert_self_or_org"
  on competition_entries for insert with check (
    player_id = auth_player_profile_id()
    or is_competition_organizer(competition_id)
  );

create policy "entries_update_org_or_self_withdraw"
  on competition_entries for update using (
    is_competition_organizer(competition_id)
    or player_id = auth_player_profile_id()
  );
```

> Na app/RPC: jogador só pode mudar a própria entry para `withdrawn`; só org pode `approved`/`rejected`. Enforce em `with check` fino ou RPC.

**`matches`**

```sql
alter table matches enable row level security;

create policy "matches_select_public"
  on matches for select using (true);

create policy "matches_write_organizer"
  on matches for all
  using (is_competition_organizer(competition_id))
  with check (is_competition_organizer(competition_id));
```

Preferir RPC `generate_bracket(competition_id)` em vez de bulk insert do client.

## Casos de teste negativos (CI)

| # | Caso | Esperado |
|---|---|---|
| N1 | Usuário sem `organizer_profiles` cria competição | INSERT negado |
| N2 | Organizador C edita competição de D | UPDATE negado |
| N3 | Jogador A inscreve `player_id` de B | INSERT negado |
| N4 | Jogador aprova a própria inscrição (`approved`) | UPDATE negado* |
| N5 | Jogador edita entry de outro | UPDATE negado |
| N6 | Anônimo INSERT em tabelas mutáveis | negado |
| N7 | Client INSERT direto em `sports` | negado |
| N8 | Não-org chama efeito de `report_match_result` | negado |

\*Só org aprova; jogador no máximo `withdrawn`.

## Times (schema presente, fluxo depois)

Helpers `is_team_staff` e policies de `teams`/`team_members` podem já existir; não bloqueiam o x1. Transfers: rascunho na Fase 2 (`player_id` → `player_profiles.id`).

## Padrão de teste

pgTAP ou integração com usuários distintos; negativos acima no CI em todo PR de migration/policy.

---
Anterior: [03-arquitetura-tecnica.md](./03-arquitetura-tecnica.md) · Próximo: [05-roadmap.md](./05-roadmap.md) · Índice: [README.md](../README.md)
