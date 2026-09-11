# Leaguefy

Monorepo da plataforma de gestão de competições.

**Documentação (fonte da verdade do desenho):** [`docs/`](./docs/) · **Relatórios de etapa:** [`reports/`](./reports/)

## Estrutura

```
Leaguefy/
├── .github/workflows/       # CI — deploy production (Vercel)
├── apps/
│   └── web/                 # @leaguefy/web — Next.js App Router + Tailwind v4 + shadcn
├── packages/
│   └── config-typescript/   # configs compartilhadas
├── supabase/                # CLI local (migrations, config.toml, seed)
├── docs/                    # arquitetura 01–08
├── reports/                 # histórico por etapa
├── docker-compose.yml       # rede local + nota do stack via CLI
├── vercel.json              # build/install do monorepo na Vercel
└── package.json             # workspaces Yarn
```

## Freeze do MVP (resumo)

| Item | Valor |
|---|---|
| Modalidade | Futebol e-sports (`futebol-esports`) |
| Formato | **x1** eliminação simples, 8 jogadores (4/16 ok) |
| Escopo | Contas, inscrição individual, chave, placar público |
| Fora do crítico | Times no fluxo, social, transfers, standings |

Detalhe: [docs/05-roadmap.md](./docs/05-roadmap.md).

## Stack

Next.js (App Router) em `apps/web` + Supabase local (`supabase/`) + RPCs de bracket no MVP.

## Comandos (raiz)

```bash
yarn install
yarn supabase:start     # Docker via Supabase CLI
yarn supabase:status
yarn dev                # apps/web — Next.js
yarn lint
yarn format
```

Ambiente local: [docs/07-ambiente-local.md](./docs/07-ambiente-local.md).  
Deploy (Vercel + Action): [docs/08-deploy-vercel.md](./docs/08-deploy-vercel.md).

## Índice da documentação

| # | Documento | Conteúdo |
|---|---|---|
| 01 | [Visão geral](./docs/01-visao-geral.md) | Produto, personas, sucesso do MVP |
| 02 | [Modelagem de dados](./docs/02-modelagem-de-dados.md) | ER MVP, enums, constraints |
| 03 | [Arquitetura técnica](./docs/03-arquitetura-tecnica.md) | Camadas, stack, RPCs |
| 04 | [Autenticação e RLS](./docs/04-autenticacao-e-rls.md) | Matriz, policies, testes |
| 05 | [Roadmap](./docs/05-roadmap.md) | Freeze + fases |
| 06 | [Desafios técnicos](./docs/06-desafios-tecnicos.md) | Riscos + checklist |
| 07 | [Ambiente local](./docs/07-ambiente-local.md) | Supabase + Docker + monorepo |
| 08 | [Deploy Vercel](./docs/08-deploy-vercel.md) | Vercel + GitHub Action (`main`) |
| — | [Relatórios](./reports/README.md) | O que foi feito por etapa |

## Convenção

- Código de produto em `apps/` e `packages/`.
- Schema/migrations em `supabase/`.
- Desenho em `docs/`; ao fechar etapa, relatório em `reports/`.
