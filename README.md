# Plataforma de Gestão de Competições — Documentação de Arquitetura

**Fonte da verdade:** este `README.md` + a série numerada em [`docs/`](./docs/) (`01`–`06`). Qualquer conteúdo fora dela é histórico ou auxiliar.

Relatórios de cada etapa: [`reports/`](./reports/).

## Índice

| # | Documento | Conteúdo |
|---|---|---|
| — | [README.md](./README.md) (este arquivo) | Índice e convenções |
| 01 | [Visão geral](./docs/01-visao-geral.md) | Produto, módulos, personas, RBAC, sucesso do MVP |
| 02 | [Modelagem de dados](./docs/02-modelagem-de-dados.md) | ER **MVP congelado**, enums, constraints, Fase 2+ |
| 03 | [Arquitetura técnica](./docs/03-arquitetura-tecnica.md) | Camadas, stack, RPCs de bracket |
| 04 | [Autenticação e RLS](./docs/04-autenticacao-e-rls.md) | Matriz MVP, helpers, policies, testes negativos |
| 05 | [Roadmap](./docs/05-roadmap.md) | Freeze Fase 1 + Fases 2–3 |
| 06 | [Desafios técnicos](./docs/06-desafios-tecnicos.md) | Riscos + checklist pré-código |
| — | [Relatórios](./reports/README.md) | Histórico do que foi feito por etapa |

### Auxiliares

| Arquivo | Papel |
|---|---|
| [001-arquitetura-plataforma-competicoes.md](./docs/001-arquitetura-plataforma-competicoes.md) | **Obsoleto** — stub que aponta para este índice |

## Produto em uma frase

Plataforma web para criar e organizar competições (e-sports ou físicos), com perfis públicos, equipes, e (nas fases seguintes) transferências e camada social.

## Freeze do MVP (resumo)

| Item | Valor |
|---|---|
| Modalidade | Futebol e-sports (`futebol-esports`) |
| Formato | **x1** eliminação simples, 8 jogadores (4/16 ok) |
| Escopo | Contas, inscrição individual, chave, placar público |
| Fora do crítico | Times no fluxo, social, transfers, standings |

Detalhe: [05-roadmap.md](./docs/05-roadmap.md).

## Stack (resumo)

Next.js (App Router) + Supabase (Auth, Postgres, RLS, Storage) + RPCs de bracket no MVP → NestJS só quando justificar → Python só para analytics pesado, se surgir.

## Próximos passos

Documentação de gaps do MVP está fechada. Sequência para código:

1. Bootstrap Next.js + Supabase (Auth Discord/e-mail).
2. Migrations do ER em [02](./docs/02-modelagem-de-dados.md) + policies em [04](./docs/04-autenticacao-e-rls.md).
3. RPCs `generate_bracket` e `report_match_result`.
4. UI do fluxo de sucesso em [01](./docs/01-visao-geral.md#critério-de-sucesso-do-mvp).
5. Testes negativos N1–N8 no CI.

Checklist: [06-desafios-tecnicos.md](./docs/06-desafios-tecnicos.md#checklist-pré-código).

## Convenção de manutenção

- Edite sempre este `README.md` (raiz) e os arquivos `docs/0N-*.md`.
- Ao fechar uma etapa de trabalho, adicione um relatório em `reports/` (ver [convenção](./reports/README.md)).
- O diagrama ER canônico do MVP vive em [02-modelagem-de-dados.md](./docs/02-modelagem-de-dados.md) (Mermaid).
- Não reintroduza um documento monolítico paralelo.
