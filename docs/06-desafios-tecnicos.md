# 06 — Principais Desafios Técnicos a Antecipar

> Parte da documentação de arquitetura da Plataforma de Gestão de Competições. Ver [README.md](../README.md) para o índice completo. Ver também: [05-roadmap.md](./05-roadmap.md) e [02-modelagem-de-dados.md](./02-modelagem-de-dados.md).

Estes riscos influenciam o desenho do MVP mesmo quando a feature completa é Fase 2+.

## 1. Motor de chaveamento

Migrar formato depois dói. O MVP usa só `single_elimination` com `participant_type: "player"`, mas o schema já separa `competition_formats.type` + `params` tipados e `matches` com `round`, `bracket_slot`, `next_match_id`, placar numérico e `winner_player_id`.

**Mitigação MVP:** RPC `generate_bracket` + `report_match_result` (`security definer`); não montar chave só no client. Torneios por time entram depois com `participant_type: "team"`, sem reescrever o motor do zero.

## 2. Concorrência em vínculos e (depois) negociações

No MVP x1 o risco imediato é **duas entries ativas** do mesmo jogador na mesma competição (unique resolve) e, quando times entrarem, dois times ativos na modalidade.

**Mitigação MVP:** `unique (competition_id, player_id)`.  
**Quando houver times:** unique parcial em `team_members` + transfers em transação.

## 3. RLS contextual

Papéis por time/competição quebram silenciosamente se não houver teste negativo.

**Mitigação:** helpers `auth_profile_id`, `auth_player_profile_id`, `is_competition_organizer`; matriz e negativos em [04](./04-autenticacao-e-rls.md); CI em toda migration/policy.

## 4. Moderação e confiança

Qualquer um com `organizer_profiles` pode criar torneio.

**MVP:** aceitável. `organizer_profiles.verified` existe no schema mas sem gate.  
**Fase 2+:** reputação/verificação antes de competições públicas em escala.

## 5. Multi-modalidade / stats

Stats de um jogo ≠ de outro.

**Mitigação:** `sports` + `player_profiles.stats` jsonb com contrato por `slug` na app. Seed do lançamento: `futebol-esports`; não criar colunas por métrica.

## Checklist pré-código

| # | Item | Doc |
|---|---|---|
| 1 | ER MVP = x1 por jogador (sem transfers/social/standings no crítico) | [02](./02-modelagem-de-dados.md) |
| 2 | Contrato `single_elimination` + `participant_type: player` | [02](./02-modelagem-de-dados.md) |
| 3 | Unique `(competition_id, player_id)` em entries | [02](./02-modelagem-de-dados.md) |
| 4 | Matriz RLS MVP + negativos | [04](./04-autenticacao-e-rls.md) |
| 5 | Freeze futebol e-sports (EA FC) / x1 / 8 jogadores / um org / uma competição por vez | [05](./05-roadmap.md) |
| 6 | Critério de sucesso ponta a ponta | [01](./01-visao-geral.md) |

---
Anterior: [05-roadmap.md](./05-roadmap.md) · Índice: [README.md](../README.md)
