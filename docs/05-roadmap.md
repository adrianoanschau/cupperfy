# 05 — Roadmap e freeze do MVP

> Parte da documentação de arquitetura da Plataforma de Gestão de Competições. Ver [README.md](../README.md) para o índice completo.

## Freeze da Fase 1 (decisões fechadas)

| Decisão | Valor congelado |
|---|---|
| Modalidade seed | **Futebol e-sports** (`sports.slug = futebol-esports`) |
| Jogo do 1º campeonato | **EA FC** (título específico; detalhe de copy/UX, não muda o slug da modalidade) |
| Formato do lançamento | **x1** — eliminação simples, inscrição **por jogador** |
| Tipo de formato | `single_elimination` com `participant_type: "player"` |
| Tamanho padrão | **8 jogadores** (`participant_count: 8`; também 4 e 16) |
| Organizador | **Um** por competição (`organizer_id`) |
| Auth | E-mail/senha + Discord |
| Times | Schema ok; **fora** do fluxo crítico do 1º torneio |
| Fora do schema crítico | Transfers, social, standings, torneio por time, multi-formato |

Critério de sucesso: [01-visao-geral.md](./01-visao-geral.md#critério-de-sucesso-do-mvp).  
Schema: [02-modelagem-de-dados.md](./02-modelagem-de-dados.md).

### Estratégia de lançamento (alfa)

- **Um campeonato por vez** — sem rodar duas competições em simultâneo no lançamento. O primeiro é o de **EA FC**; próximos jogos/edições entram depois, em sequência.
- Cada edição roda em **um sábado**.
- **Final com transmissão ao vivo** no canal da Cupperfy no YouTube, narrada por **Adriano Anschau**.
- Captação de interessados: cadastro na landing (`alpha_waitlist`) → **convite pessoal** via `/checkin/<token>` quando a próxima edição for aberta. Fluxo técnico em [07-ambiente-local.md](./07-ambiente-local.md).
- Isso não exige mudança de schema: é sequenciamento operacional de quando cada `competitions` é criada/aberta, não uma regra de banco (multi-organizador/simultaneidade continuam fora do MVP conforme já congelado acima).

### Entregáveis da Fase 1 (lançamento)

- Cadastro/login (Supabase Auth)
- Perfil de jogador + organizador (staff opcional)
- Criar competição x1 no formato freeze
- Inscrição do próprio jogador (`pending` → `approved`)
- RPC: gerar chave + lançar resultado / avançar bracket
- Páginas públicas: perfil, competição/chave, placares

### Explicitamente fora da Fase 1

- Torneios por time / inscrição via staff
- Feed, follows, posts, conquistas
- Transferências / mercado
- Grupos, pontos corridos, eliminação dupla
- Pagamentos, verificação de organizador (campo `verified` sem gate)
- Admin/moderação; app mobile; realtime obrigatório (poll ok)

---

## Fase 2 — Times, social e mercado

- CRUD de equipes + elenco no fluxo de produto
- Torneios com `participant_type: "team"`
- Feed / follows; transferências; notificações (Realtime)
- Mais formatos + `standings`

## Fase 3 — Monetização e integrações

- Pagamentos, verificação, APIs de stats, analytics (Python se precisar)

---

Riscos: [06-desafios-tecnicos.md](./06-desafios-tecnicos.md).

---
Anterior: [04-autenticacao-e-rls.md](./04-autenticacao-e-rls.md) · Próximo: [06-desafios-tecnicos.md](./06-desafios-tecnicos.md) · Índice: [README.md](../README.md)
