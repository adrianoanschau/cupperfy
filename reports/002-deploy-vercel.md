# 002 — Deploy Vercel + GitHub Actions

**Data:** 2026-09-11  

## Objetivo

Preparar o monorepo para publicação do `@leaguefy/web` na Vercel, com deploy automático de production em push na `main`.

## O que foi feito

- `vercel.json` na raiz (`yarn install` + `yarn workspace @leaguefy/web build`)
- Workflow `.github/workflows/deploy-production.yml` (pull → build → deploy `--prebuilt --prod`)
- Doc [`docs/08-deploy-vercel.md`](../docs/08-deploy-vercel.md): Root Directory, env vars, secrets, anti double-deploy
- README / índice / `.gitignore` (`.vercel`) atualizados
- Relatório desta etapa

## Decisões

| Tema | Decisão |
|---|---|
| App na Vercel | Root Directory `apps/web` |
| Production CI | GitHub Action na `main` |
| Preview | Integração Git Vercel (PRs), se habilitada |
| Package manager | Yarn 4 via Corepack (`packageManager` na raiz) |

## Fora desta etapa

- Criar os secrets no GitHub / token Vercel (ação manual do time)
- Desligar auto-deploy production na Vercel (se ainda estiver on)
- Supabase cloud + env de produção preenchidos

## Próxima etapa sugerida

Validar o primeiro deploy (manual `workflow_dispatch` ou push), conferir URL e env Supabase em production.
