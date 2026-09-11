# @leaguefy/web

Next.js 16 (App Router) · Tailwind CSS v4 · shadcn/ui · ESLint (estilo Airbnb) · Prettier

## Comandos (pela raiz do monorepo)

```bash
yarn dev           # next dev
yarn build
yarn lint
yarn format
```

Ou no workspace: `yarn workspace @leaguefy/web <script>`.

## Padronização

| Tool | Config |
|---|---|
| Prettier | `.prettierrc.json` — singleQuote, trailingComma all, printWidth 100 + plugin Tailwind |
| ESLint | `eslint.config.mjs` — `eslint-config-next` + regras estilo Airbnb + `prettier/prettier` |

> `eslint-config-airbnb` clássico não é estável com ESLint 9 + flat config do Next 16. As convenções Airbnb estão espelhadas nas regras + Prettier.

## shadcn/ui

- `components.json` · componentes em `src/components/ui/`
- Util `cn` em `src/lib/utils.ts`
- Adicionar: `yarn dlx shadcn@latest add <component>` (em `apps/web`)

## Deploy

Ver [docs/08-deploy-vercel.md](../../docs/08-deploy-vercel.md). Root Directory na Vercel: `apps/web`.
