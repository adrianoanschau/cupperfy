# 001 — Arquitetura e documentação

**Data:** 2026-09-11  
**Commit:** `6ec38f7` — *Document architecture for Cupperfy MVP launch.*

## Objetivo

Fechar a documentação de arquitetura do Cupperfy antes de escrever código, com escopo alinhado ao torneio de lançamento.

## O que foi feito

- Série canônica em `docs/` (`01`–`06`) + índice na raiz (`README.md`)
- Remoção da duplicidade do documento monolítico (fonte única da verdade)
- Gaps fechados: personas, critério de sucesso, ER do MVP, RLS, freeze, checklist pré-código
- Freeze ajustado ao lançamento real: **x1 de futebol e-sports** (não Valorant / não torneio por time)
- Pasta `docs/` como casa da série; links internos atualizados

## Decisões principais

| Tema | Decisão |
|---|---|
| Modalidade seed | Futebol e-sports (`futebol-esports`) |
| Formato do lançamento | x1, eliminação simples, inscrição por jogador |
| Tamanho padrão | 8 jogadores (4/16 ok) |
| Times | Schema previsto; fora do fluxo crítico do 1º torneio |
| Stack MVP | Next.js + Supabase + RPCs de bracket (`generate_bracket`, `report_match_result`) |
| NestJS / Python | Só depois, se a lógica justificar |

## Fora desta etapa

- Código da aplicação (bootstrap Next.js/Supabase)
- Migrations SQL reais e policies aplicadas no projeto
- UI do fluxo ponta a ponta

## Próxima etapa sugerida

Bootstrap do app + migrations do ER em `docs/02` e policies em `docs/04`, com novo relatório nesta pasta.
