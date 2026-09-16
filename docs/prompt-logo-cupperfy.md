# Prompt para geração da logomarca — Cupperfy

> Use este prompt em uma ferramenta de geração de imagem (Midjourney, DALL·E, etc.) para explorar variações/refinamentos da marca. Serve também como briefing para um designer, já que reúne as decisões de identidade visual já fechadas no projeto (`docs/09-design-system.md`).

## Prompt (para IA de imagem)

```
Minimalist esports logo for "Cupperfy", a competitive gaming and sports
tournament platform. Wordmark logo combining a trophy icon with the text
"cupperfy" in a modern geometric sans-serif typeface (bold, tight tracking,
similar to Oxanium font family). The word splits into two color treatments:
"cupper" in clean white/off-white, "fy" in vibrant orange (hex #F97316-ish,
institutional brand orange). Trophy icon sits above or integrated with the
wordmark, rendered as simple bold line art / geometric silhouette, same
orange as the "fy" accent — no gradients, no photorealism, flat vector style.

Background: deep warm black (not pure gray-black, slightly warm undertone),
completely transparent-friendly for logo usage. Optional subtle atmosphere:
faint orange glow or blurred stadium/crowd bokeh behind the mark, very
low opacity, never competing with the logotype for attention.

Style: sporty esports branding, confident, high contrast, scalable — must
read clearly as a small app icon and as a large hero banner. Clean vector
lines, no clutter, no drop shadows, no 3D bevels, no glassmorphism effects
on the logo itself (glass effects are reserved for UI panels, not the mark).
No text other than "cupperfy". No extra taglines, no borders, no badges.

Deliver as a square icon-friendly composition AND a horizontal
lockup (trophy + wordmark side by side) as two separate concepts.
```

## Diretrizes de identidade a respeitar (não negociáveis)

Extraído de `docs/09-design-system.md` — qualquer variação gerada deve respeitar:

| Elemento | Regra |
|---|---|
| Cor institucional | Laranja (`brand-500`) para ação/destaque; preto/`ink-950` para estrutura |
| Tom | Esportivo / e-sports — **não** usar roxo default, cream+terracota, ou glow multi-camada |
| Tipografia de marca | Família **Oxanium** (display/heading) — a mesma usada em H1–H6 e placares no produto |
| Efeito de vidro | **Não** aplicar glassmorphism na logo em si — isso é reservado para painéis de UI (`cf-glass*`), não para o mark |
| Fundo | A logo precisa funcionar tanto em fundo escuro (`ink-950`) quanto claro — gerar/planejar uma versão para cada modo |
| Simplicidade | Precisa funcionar como favicon/ícone de app pequeno — evitar detalhes finos demais que somem em tamanho reduzido |

## Variações a pedir na sessão de geração

1. **Ícone isolado** (só o troféu, sem texto) — para favicon, avatar de rede social, app icon.
2. **Lockup horizontal** (troféu + "cupperfy") — para header do site, assinatura de e-mail.
3. **Versão monocromática** (só branco, só preto) — para aplicações em fundo colorido ou impressão de 1 cor.
4. **Versão para modo claro** — ajustando o troféu/texto para contraste em fundo claro, já que o produto tem toggle claro/escuro/sistema.

## Próximo passo após gerar concepts

As imagens geradas por IA servem como **exploração/direção**, não como asset final de produção — para uso real no site (favicon, `layout.tsx`, `design-system/page.tsx`) o ideal é vetorizar a versão escolhida (Illustrator/Figma) para ter SVG limpo e escalável, evitando artefatos de raster típicos de geração por IA.
