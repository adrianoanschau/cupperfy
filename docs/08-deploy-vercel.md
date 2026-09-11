# 08 — Deploy (Vercel + GitHub Actions)

> Parte da documentação. Índice: [README.md](../README.md).

## Visão geral

| Peça | Papel |
|---|---|
| App | `@leaguefy/web` (`apps/web`) — Next.js |
| Host | [Vercel](https://vercel.com) |
| CI produção | GitHub Action [deploy-production.yml](../.github/workflows/deploy-production.yml) em push na `main` |
| Preview (PRs) | Integração Git da Vercel (recomendado) |

Monorepo Yarn: install na **raiz**; build via `yarn workspace @leaguefy/web build` (`vercel.json`).

## Configuração do projeto na Vercel

1. Importar o repo `adrianoanschau/leaguefy`.
2. **Root Directory:** `apps/web`  
   (em *Settings → General → Root Directory*).  
   Deixe habilitado incluir arquivos fora do root (workspaces / `yarn.lock` na raiz).
3. Framework: Next.js (detectado).
4. Build/Install: respeitam o [`vercel.json`](../vercel.json) da raiz — ou deixe o default da Vercel com Root Directory `apps/web`.
5. Node: ≥ 20 (alinhado a `packageManager` / `engines` da raiz; Corepack ativa o Yarn 4).

### Variáveis de ambiente (Production / Preview)

Definir no dashboard Vercel (*Settings → Environment Variables*):

| Variável | Escopo | Notas |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Production + Preview | URL do projeto Supabase (cloud) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production + Preview | anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production (+ Preview se precisar) | **Só servidor** — nunca `NEXT_PUBLIC_` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Production + Preview | Key Gemini (AI Studio) — só servidor |
| `NEXT_PUBLIC_WHATSAPP_URL` | Production + Preview | Ex.: `https://wa.me/adrianoanschau` |
| `NEXT_PUBLIC_TELEGRAM_URL` | Production + Preview | Ex.: `https://t.me/adrianoanschau` |
| `NEXT_PUBLIC_YOUTUBE_URL` | Production + Preview | Opcional — default `https://www.youtube.com/@Leaguefy` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Production + Preview | Opcional — default `https://www.instagram.com/leaguefy.oficial/` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Production + Preview | E-mail de parcerias (`/apoiadores`) |
| `NEXT_PUBLIC_PIX_PAYLOAD` | Production + Preview | PIX “copia e cola” (QR em `/apoiadores`) |
| `NEXT_PUBLIC_PIX_KEY_LABEL` | Production + Preview | Chave legível (opcional) |
| `NEXT_PUBLIC_PIX_BENEFICIARY` | Production + Preview | Nome exibido no PIX (opcional) |
| `ADMIN_PASSWORD` | Production | Senha do `/admin` |
| `ADMIN_SESSION_SECRET` | Production | Segredo cookie admin (≥32 chars) |
| `RESEND_API_KEY` | Production | Envio de convites por e-mail |
| `EMAIL_FROM` | Production | Remetente verificado no Resend |
| `NEXT_PUBLIC_APP_URL` | Production + Preview | Origem absoluta dos links |

Template local: [`.env.example`](../.env.example). Não commitar `.env.production` / `.env.local`.

## GitHub Actions (deploy em `main`)

Workflow: `.github/workflows/deploy-production.yml`

Fluxo: `checkout` → Corepack/Yarn → `vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`.

### Secrets do repositório

Em GitHub → *Settings → Secrets and variables → Actions*:

| Secret | Onde obter |
|---|---|
| `VERCEL_TOKEN` | [Vercel → Account → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | `.vercel/project.json` → `orgId` (após `vercel link`) |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` → `projectId` |

### Linkar o projeto uma vez (local)

```bash
# na raiz do monorepo
corepack enable
yarn dlx vercel@latest login
yarn dlx vercel@latest link
# Root Directory: apps/web (se perguntar)
```

Isso gera `.vercel/` (gitignored). Copie `orgId` e `projectId` para os secrets.

### Evitar deploy duplo

Se a Action publica production **e** a integração Git da Vercel também faz deploy de `main`, você terá **dois** deploys.

Recomendação:

- **Production:** só a GitHub Action (desligar *Production* em *Vercel → Project → Settings → Git → Ignored Build Step* / desabilitar auto-deploy de production para `main`), **ou**
- **Production:** só a integração Git (aí a Action é redundante).

Preview de PR pode continuar na integração Git.

## Checklist pós-publish

- [ ] Root Directory = `apps/web`
- [ ] Env vars de Supabase na Vercel
- [ ] Secrets `VERCEL_*` no GitHub
- [ ] Push na `main` dispara o workflow (aba Actions)
- [ ] Evitado double-deploy production
- [ ] URL de produção abre a home Leaguefy

## Comandos úteis

```bash
yarn dlx vercel@latest ls
yarn dlx vercel@latest inspect <url>
yarn dlx vercel@latest logs <url>
```
