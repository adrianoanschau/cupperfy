# 03 — Arquitetura Técnica

> Parte da documentação de arquitetura da Plataforma de Gestão de Competições. Ver [README.md](../README.md) para o índice completo. Ver também: [02-modelagem-de-dados.md](./02-modelagem-de-dados.md).

## Arquitetura Técnica

Dado que o stack escolhido é Next.js + Supabase, a arquitetura fica bem mais simples se o Supabase carregar o máximo possível (auth, banco, storage, realtime, e mesmo boa parte da API via PostgREST + RLS), reservando um backend próprio (NestJS ou Python) só para lógica de negócio que não é "CRUD com regra de acesso" — ou seja, coisas como motor de chaveamento, cálculo de classificação, e regras de negociação.

```
┌─────────────────────────────┐
│   Next.js (App Router)      │  ← Frontend + Server Components
│   React + Server Actions    │     (renderização, SEO, formulários)
└──────────────┬───────────────┘
               │
      ┌────────┴─────────┐
      │                  │
┌─────▼──────┐   ┌───────▼────────────┐
│  Supabase   │   │  Backend próprio    │
│  - Auth     │   │  (NestJS ou FastAPI)│
│  - Postgres │   │  - Motor de chaves  │
│  - RLS      │   │  - Regras de        │
│  - Storage  │   │    negociação       │
│  - Realtime │   │  - Jobs assíncronos │
└─────────────┘   └────────────────────┘
```

**Por que não usar só Supabase direto do frontend, sem backend próprio?**
Dá para ir longe só com Supabase + RLS (é inclusive o caminho mais rápido para o MVP). Mas lógicas como "gerar chaveamento de 8/16 jogadores", validar inscrição, ou (Fase 2) "fechar transferência" são mais seguras fora do browser. Recomendação: **Next.js Server Actions + RPCs Postgres `security definer` no MVP**; extrair NestJS só quando a lógica de torneio justificar — não construir NestJS antes de precisar.

### Fronteira de lógica no MVP

| O quê | Onde roda |
|---|---|
| CRUD de perfis, competições, entries (x1) | Server Actions / PostgREST + RLS |
| `generate_bracket(competition_id)` | RPC Postgres (`security definer`) ou Server Action com service role |
| `report_match_result(match_id, score_a, score_b)` | Idem — valida org, grava placar, promove `winner_player_id` via `next_match_id` |
| Realtime de placar | **Opcional no MVP** (poll/refresh basta); Realtime na Fase 2 |
| NestJS / Python | Fora do MVP |

Sobre Python: só quando houver necessidade concreta (analytics, replays). Não dividir o backend principal em duas linguagens sem necessidade.

## Stack Recomendada

| Camada | Recomendação | Observação |
|---|---|---|
| Frontend | Next.js (App Router) + React | Server Components para performance e SEO nos perfis públicos |
| Estilo/UI | Tailwind + shadcn/ui | Produtividade alta, fácil manter consistência visual |
| Backend | Supabase direto no início → NestJS quando a lógica crescer | Evita over-engineering no MVP |
| Banco de dados | Supabase (Postgres) | Já cobre auth, storage, realtime, RLS |
| Autenticação | Supabase Auth | Suporta e-mail/senha, OAuth (Google, Discord — relevante p/ e-sports) |
| Realtime | Supabase Realtime | Fase 2+; MVP pode usar refresh manual |
| Hospedagem frontend | Vercel | Integração nativa com Next.js |
| Hospedagem backend (se/quando existir) | Railway ou Fly.io | Só após extrair NestJS |
| Fila/jobs assíncronos | Edge Functions ou BullMQ | Notificações/standings — Fase 2+ |
| Analytics/dados pesados (futuro) | Python (FastAPI) isolado | Só quando necessário |

---
Anterior: [02-modelagem-de-dados.md](./02-modelagem-de-dados.md) · Próximo: [04-autenticacao-e-rls.md](./04-autenticacao-e-rls.md) · Índice: [README.md](../README.md)
