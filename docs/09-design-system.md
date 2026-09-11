# 09 — Identidade visual e design system

> Parte da documentação. Índice: [README.md](../README.md).  
> Referência viva: [`/design-system`](../../apps/web/src/app/design-system/page.tsx) no app.

## Direção

| Eixo | Escolha |
|---|---|
| Institucional | **Laranja** (ação / competição) + **preto** (estrutura / contraste) |
| Modo | Claro por sistema; toggle Claro / Escuro / Sistema (`next-themes`) |
| Tom | Esportivo / e-sports — energia sem “glow” nem roxo genérico |
| UI | shadcn/ui + tokens CSS (OKLCH) |

## Tipografia

| Papel | Família | Uso |
|---|---|---|
| Display | **Oxanium** (`font-heading`) | Marca, H1–H6, placares |
| Corpo | **Manrope** (`font-sans`) | Texto, forms, navegação |

Carregadas via `next/font` em `apps/web/src/app/layout.tsx`.

## Escalas de cor

Definidas em `apps/web/src/app/globals.css`:

- **`brand-50` … `brand-950`** — laranja; **`brand-500`** é o institucional
- **`ink-50` … `ink-950`** — pretos/cinzas quentes (não cinza frio puro)

### Mapeamento shadcn

| Token | Light | Dark |
|---|---|---|
| `primary` | `brand-500` | `brand-400` |
| `primary-foreground` | `ink-950` | `ink-950` |
| `background` | off-white quente | `ink-950` |
| `foreground` | `ink-950` | off-white |
| `accent` | `brand-100` | `brand-900` |
| `ring` | `brand-500` | `brand-400` |

Ajuste fino: edite só as variáveis `--brand-*` / `--ink-*`; os semânticos acompanham.

## Uso no código

```tsx
<button className="bg-primary text-primary-foreground">CTA</button>
<span className="text-brand-600">destaque</span>
<div className="bg-ink-950 text-brand-400">faixa escura</div>
<h1 className="font-heading">Título</h1>
```

## Modo escuro

- Estratégia: classe `.dark` no `<html>` via `next-themes` (`attribute="class"`).
- Padrão: `system` (respeita o SO).
- Toggle: `ThemeToggle` (Claro / Escuro / Sistema) no header.
- Tokens dark: bloco `.dark { … }` em `globals.css`.

1. **Marca primeiro** em superfícies promocionais — o nome Leaguefy como sinal hero.
2. **Uma composição** no primeiro viewport (não dashboard).
3. **Laranja com parcimônia** — CTAs e destaques; preto/ink para estrutura.
4. **Sem** roxo default, cream+terracotta, glow multi-camada.

## Arquivos

| Path | Papel |
|---|---|
| `apps/web/src/app/globals.css` | Tokens + tema light/dark |
| `apps/web/src/app/layout.tsx` | Fontes |
| `apps/web/src/app/design-system/page.tsx` | Catálogo visual |
| `apps/web/components.json` | shadcn (CSS variables) |
