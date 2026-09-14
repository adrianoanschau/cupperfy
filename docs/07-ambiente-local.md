# 07 — Ambiente local (monorepo + Supabase + Docker)

> Parte da documentação. Índice: [README.md](../README.md).

## Layout do monorepo

```
apps/web                 → @cupperfy/web (Next.js)
packages/*               → libs compartilhadas (@cupperfy/*)
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
yarn dev       # Next.js em apps/web
yarn lint
yarn format
```

Stack do app: App Router · Tailwind v4 · shadcn/ui · ESLint estilo Airbnb + Prettier.  
Env: `apps/web/.env.local` (template na raiz: `.env.example`).  
Copie `API_URL` → `NEXT_PUBLIC_SUPABASE_URL` e `ANON_KEY` → `NEXT_PUBLIC_SUPABASE_ANON_KEY` do `yarn supabase:status`.

### Lista de interesse (alfa)

Registros vão para a tabela `public.alpha_waitlist` (migration em `supabase/migrations/`).

1. Aplique migrations: `yarn supabase:reset` (ou `supabase db reset`)
2. Envie o form na landing (`#alfa`)
3. Confira no Studio: http://127.0.0.1:54323 → Table Editor → `alpha_waitlist`

RLS: anon pode **inserir**; leitura pública bloqueada (veja no Studio com role `postgres` / service).

### Chat (Gemini)

Widget flutuante (`SiteChat`) → `POST /api/chat`.

- FAQ básico: respostas prontas em `src/lib/chat/canned-faq.ts` (sem chamar Gemini).
- Demais perguntas: `@ai-sdk/google` (`gemini-3.5-flash-lite`).

Em `apps/web/.env.local`:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=…   # AI Studio
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/adrianoanschau
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/adrianoanschau
# Opcionais (já há default): YouTube @Cupperfy, Instagram @cupperfy.oficial, e-mail contato@cupperfy.com
```

Sem a key do Gemini o endpoint responde 503.

### Check-in de agenda (`/checkin/<token>`)

Link **pessoal** com token. Nome e e-mail vêm do convite (somente leitura). Dá para marcar **várias** janelas.

1. Edite slots em `apps/web/src/lib/checkin/slots.ts`
2. Migrations: `alpha_checkins` + `alpha_checkin_invites` (`yarn supabase db push --local`)
3. Crie um convite (Studio SQL ou psql):

```sql
insert into public.alpha_checkin_invites (token, email, name)
values (
  encode(gen_random_bytes(24), 'hex'),
  'pessoa@email.com',
  'Nome da Pessoa'
)
returning token, email;
-- link: /checkin/<token>
```

4. Confira respostas em `alpha_checkins` (várias linhas por pessoa, uma por horário)

`/checkin` sem token só orienta a usar o link pessoal. Reenvio no mesmo link substitui a disponibilidade.

### Admin (`/admin`)

Área protegida por senha (cookie assinado).

1. Em `apps/web/.env.local`:
   - `ADMIN_PASSWORD=…`
   - `ADMIN_SESSION_SECRET=…` (mín. 32 caracteres)
2. Abra `/admin/login` → lista em `/admin/interessados`
3. Gere/copie o link `/checkin/<token>` por interessado, ou use **Enviar por e-mail**

E-mail:

- **Local:** Mailpit do Supabase (`SMTP_HOST=127.0.0.1`, `SMTP_PORT=54325`) — inbox em http://127.0.0.1:54324  
  (precisa `smtp_port = 54325` em `supabase/config.toml` e `yarn supabase:start`)
- **Produção:** Resend (`RESEND_API_KEY` + `EMAIL_FROM` verificado; Reply-To via `EMAIL_REPLY_TO`)

```bash
# local
SMTP_HOST=127.0.0.1
SMTP_PORT=54325
EMAIL_FROM=Cupperfy <noreply@cupperfy.local>
EMAIL_REPLY_TO=contato@cupperfy.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Também no Vercel (Production): as mesmas vars + `SUPABASE_SERVICE_ROLE_KEY`.

## Arquivos relevantes

| Path | Papel |
|---|---|
| `package.json` | Workspaces Yarn + scripts supabase |
| `yarn.lock` / `.yarnrc.yml` | Lockfile e `nodeLinker: node-modules` |
| `apps/web/` | Frontend Next.js |
| `packages/` | Código compartilhado |
| `supabase/config.toml` | Portas do stack local |
| `supabase/migrations/` | SQL versionado |
| `docker-compose.yml` | Rede `cupperfy_dev`; stack Supabase via CLI |

O compose da raiz não redefine Postgres/Auth — evita divergir do CLI. Serve para serviços extras na mesma rede depois.
