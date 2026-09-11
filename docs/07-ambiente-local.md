# 07 — Ambiente local (monorepo + Supabase + Docker)

> Parte da documentação. Índice: [README.md](../README.md).

## Layout do monorepo

```
apps/web                 → @leaguefy/web (Next.js)
packages/*               → libs compartilhadas (@leaguefy/*)
supabase/                → CLI (fica na raiz — convenção do Supabase)
docs/ · reports/         → documentação e histórico
```

Workspaces Yarn na raiz (`package.json` → `"workspaces": ["apps/*", "packages/*"]`, `packageManager: yarn@4`).

## Pré-requisitos

- Docker Engine + Docker Compose v2 (daemon rodando)
- Node.js ≥ 20 (nvm em `~/.config/nvm`)
- Yarn 4 via Corepack (`corepack enable`)

## Supabase local

O **Supabase CLI** orquestra o stack com **Docker Compose** (imagens oficiais). Rode os comandos **na raiz** do monorepo:

```bash
yarn install
yarn supabase:start
yarn supabase:status
```

| Serviço | URL / porta padrão |
|---|---|
| API | http://127.0.0.1:54321 |
| Studio | http://127.0.0.1:54323 |
| Postgres | `127.0.0.1:54322` (`postgres` / `postgres`) |
| Inbucket | http://127.0.0.1:54324 |

Parar: `yarn supabase:stop` · Reset: `yarn supabase:reset`  
Containers: `docker ps --filter "name=supabase"`

## App web

```bash
yarn dev    # → workspace @leaguefy/web (após scaffold Next.js)
```

Env do app: `apps/web/.env.local` (template na raiz: `.env.example`).

## Arquivos relevantes

| Path | Papel |
|---|---|
| `package.json` | Workspaces Yarn + scripts supabase |
| `yarn.lock` / `.yarnrc.yml` | Lockfile e `nodeLinker: node-modules` |
| `apps/web/` | Frontend Next.js |
| `packages/` | Código compartilhado |
| `supabase/config.toml` | Portas do stack local |
| `supabase/migrations/` | SQL versionado |
| `docker-compose.yml` | Rede `leaguefy_dev`; stack Supabase via CLI |

O compose da raiz não redefine Postgres/Auth — evita divergir do CLI. Serve para serviços extras na mesma rede depois.
