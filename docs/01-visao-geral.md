# 01 — Visão Geral do Produto

> Parte da documentação de arquitetura da Plataforma de Gestão de Competições. Ver [README.md](../README.md) para o índice completo.

## Visão Geral do Produto

Uma plataforma web onde qualquer pessoa pode criar e organizar competições (e-sports, esportes físicos, ou qualquer outra modalidade), reunindo em um só lugar:

- **Jogadores/atletas** com perfil público (histórico, estatísticas, equipes por que passaram)
- **Comissões técnicas** (treinadores, técnicos, staff) com perfil próprio
- **Organizadores de eventos/competições**
- **Equipes/times**, que podem "negociar" jogadores entre si (sistema de transferências — Fase 2)
- Uma camada social (feed, seguir perfis, conquistas — Fase 2)

São **três módulos** ligados pela mesma identidade e permissões:

| Módulo | Fase em que entra |
|---|---|
| (1) Motor de torneios/competições | **Fase 1 (MVP)** — lançamento em **x1** |
| (2) Rede social de perfis esportivos | Fase 2 |
| (3) Mercado de transferências | Fase 2 |

**Torneio de lançamento do site:** campeonato **x1 de futebol e-sports** (eliminação simples, inscrição individual). Jogo do lançamento: **EA FC** (`sports.slug` permanece `futebol-esports`; EA FC é o título específico usado na copy/UX — ver [05-roadmap.md](./05-roadmap.md)).

### Estratégia de lançamento (alfa)

- Campeonatos rodam **um de cada vez**, nunca em simultâneo. O primeiro é o de **EA FC**.
- Cada edição acontece em **um sábado**.
- A **final** tem **transmissão ao vivo no canal da Cupperfy no YouTube**, narrada por **Adriano Anschau** (idealizador da plataforma).
- Interessados se cadastram na lista de espera do site e aguardam **convite pessoal** (fluxo já existente via `alpha_waitlist` + `/checkin/<token>` — ver [07-ambiente-local.md](./07-ambiente-local.md)).

## Personas (MVP / lançamento)

| Persona | Objetivo principal | O que precisa no MVP |
|---|---|---|
| **Organizador** | Rodar o x1 de lançamento | Criar competição, aprovar jogadores, gerar chave, lançar placar |
| **Jogador** | Se inscrever e jogar o bracket | Conta, perfil de jogador, inscrição, ver confrontos |

Staff/times existem no produto longo prazo, mas **não** são o fluxo crítico do 1º campeonato. Admin/moderação pesada fora do MVP ([05](./05-roadmap.md)).

## Papéis de Usuário (RBAC)

| Papel | Pode fazer |
|---|---|
| **Jogador** | Criar perfil, **inscrever-se em competições x1**, ver histórico; (depois) times/transferências |
| **Comissão técnica** | Gerenciar elenco; (Fase 2+) inscrever time / transfers — fora do lançamento x1 |
| **Organizador** | Criar competições, gerenciar inscrição, gerar chave, lançar resultados |
| **Equipe (entidade)** | Fora do fluxo do lançamento; schema preparado para depois |
| **Admin da plataforma** | Fora do schema do MVP |

Um mesmo usuário acumula papéis via **um user → um profile → especializações**.

## Critério de sucesso do MVP

O lançamento está validado quando **sem intervenção manual no banco**:

1. Organizador cria conta e perfil de organizador  
2. Vários jogadores criam conta e `player_profiles` na modalidade futebol e-sports  
3. Organizador cria a competição x1 (eliminação simples, ex.: 8 jogadores)  
4. Jogadores se inscrevem; organizador aprova  
5. Chaveamento gerado automaticamente  
6. Resultados lançados até a final  
7. Visitantes veem chave e placares em páginas públicas  

Detalhe: [05-roadmap.md](./05-roadmap.md) · Schema: [02-modelagem-de-dados.md](./02-modelagem-de-dados.md).

---
Índice: [README.md](../README.md) · Próximo: [02-modelagem-de-dados.md](./02-modelagem-de-dados.md)
