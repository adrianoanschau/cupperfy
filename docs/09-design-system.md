# 09 — Identidade visual e design system

> Parte da documentação. Índice: [README.md](../README.md).  
> Referência viva: [`/design-system`](../../apps/web/src/app/design-system/page.tsx) no app.

## Direção

| Eixo | Escolha |
|---|---|
| Institucional | **Laranja** (ação / competição) + **preto** (estrutura / contraste) |
| Modo | Claro por sistema; toggle Claro / Escuro / Sistema (`next-themes`) |
| Tom | Esportivo / e-sports + **glassmorphism** (vidro fosco sobre atmosfera) |
| UI | shadcn/ui + tokens CSS (OKLCH) + utilitários `cf-glass*` |

## Tipografia

| Papel | Família | Uso |
|---|---|---|
| Display | **Oxanium** (`font-heading`) | Marca (`cupperfy`), H1–H6, placares |
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

## Glassmorphism

Utilitários em `globals.css` (tokens `--glass-*` light/dark):

| Classe | Uso |
|---|---|
| `cf-glass` | Painéis / passos / footer |
| `cf-glass-strong` | Formulários e menus flutuantes |
| `cf-glass-hero` | Bloco de conteúdo sobre foto do hero |
| `cf-glass-nav` | Barra de navegação no hero |

Receita: fill translúcido + `backdrop-filter: blur` + borda clara fina + highlight interno 1px (sem multi-shadow).

O vidro precisa de **fundo com textura/foto/gradiente** atrás — em seções claras use radial brand suave.

## Modo escuro

- Estratégia: classe `.dark` no `<html>` via `next-themes` (`attribute="class"`).
- Padrão: `system` (respeita o SO).
- Toggle: `ThemeToggle` (Claro / Escuro / Sistema) no header.
- Tokens dark: bloco `.dark { … }` em `globals.css`.

## Marca

Lockup: símbolo do troféu + wordmark **cupperfy** em Oxanium (`BrandMark`). O `fy` usa `text-primary`.

| Peça | Onde |
|---|---|
| Fonte | `design/cupperfy-icon.png` |
| UI | `apps/web/public/brand/cupperfy-icon.png` |
| Favicon | `apps/web/src/app/icon.png` + `favicon.ico` + `apple-icon.png` |

Uso na UI: header, footer, heros, chat, admin, check-in. Ícone isolado no launcher do chat e na aba do browser.

## Princípios de composição

1. **Marca primeiro** em superfícies promocionais — ícone + wordmark Cupperfy como sinal hero.
2. **Uma composição** no primeiro viewport (não dashboard).
3. **Laranja com parcimônia** — CTAs e destaques; preto/ink para estrutura.
4. **Vidro com propósito** — sobre foto/atmosfera; não em fundo chapado.
5. **Sem** roxo default, cream+terracotta, glow multi-camada.

## Arquivos

| Path | Papel |
|---|---|
| `apps/web/src/app/globals.css` | Tokens + tema light/dark + `cf-glass*` |
| `apps/web/src/app/layout.tsx` | Fontes |
| `apps/web/src/components/brand-mark.tsx` | Lockup + símbolo |
| `apps/web/src/app/design-system/page.tsx` | Catálogo visual |
| `apps/web/components.json` | shadcn (CSS variables) |
