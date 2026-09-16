# Campanha Instagram — Lista de interesse (Campeonato EA FC)

> Documentação de apoio para publicar e impulsionar o post de divulgação da lista de interesse do primeiro campeonato (EA FC). Não é parte do schema/produto — é material operacional de marketing.

## Status das artes

✅ **Concluído** — duas versões já editadas com a copy final:

| Arquivo | Formato | Proporção | Uso |
|---|---|---|---|
| `post_cupperfy.png` | Feed / Explore | 4:5 (vertical, ~1080×1350) | Post no feed principal |
| `post_cupperfy_2.png` | Stories / Reels | 9:16 (vertical, ~1080×1920) | Stories, Reels, anúncio em posicionamento vertical |

Copy usada em ambas (mantida consistente):

- **Título:** "Você disputa um campeonato. Você entra numa comunidade."
- **Destaque:** "PRIMEIRO CAMPEONATO: EA FC"
- **CTA:** "Vagas por convite – entre na lista de interesse"
- **Rodapé:** `cupperfy.com`

## Link com UTM (usar em tudo relacionado a este post)

```
https://cupperfy.com/?utm_source=instagram&utm_medium=paid&utm_campaign=alfa_eafc
```

Use esse link — não `cupperfy.com` puro — na bio (temporariamente, se for linkar por lá), no botão do anúncio e em qualquer Story com link. Isso permite depois separar, no Analytics, quantos cadastros vieram desse anúncio específico vs. tráfego orgânico.

## Passo a passo para publicar e impulsionar

1. **Publicar o post orgânico primeiro**
   Publicar `post_cupperfy.png` no feed da conta @cupperfy, com legenda usando a mesma copy objetiva (jogo + convite). Necessário porque o anúncio vai promover esse post já existente, não um anúncio criado do zero.

2. **Publicar a versão Stories** (`post_cupperfy_2.png`)
   Pode ir como Stories normal na mesma janela de tempo do post do feed, reforçando a mensagem.

3. **Ir no Meta Ads Manager** — `business.facebook.com/adsmanager`
   Não usar o botão "Impulsionar publicação" do app: ele só otimiza engajamento/alcance. O Ads Manager permite objetivo de conversão de verdade.

4. **Configurar a campanha**
   - **Objetivo:** "Tráfego" (padrão) — trocar para "Conversões" somente se já houver Pixel/Conversions API instalado no site rastreando o cadastro na lista.
   - **Público:** idade 16–35, interesses em EA FC / FIFA, e-sports, jogos de futebol.
   - **Posicionamento:** automático (Advantage+), deixando o algoritmo escolher onde performa melhor entre feed/Stories/Reels — por isso ter as duas proporções de arte prontas ajuda.
   - **Orçamento:** teste inicial de R$20–30/dia por 5–7 dias antes de escalar.

5. **Selecionar o post já publicado como criativo**
   Ao criar o anúncio, escolher "Usar publicação existente" e selecionar o post do passo 1 — mantém likes/comentários já acumulados, o que passa mais credibilidade do que um anúncio zerado.

6. **Conferir o link de destino do anúncio**
   Colar o link com UTM (acima) no campo de destino — não `cupperfy.com` puro. Botão de call-to-action: "Saiba mais" ou "Cadastre-se" (mais adequados ao objetivo de lista de interesse do que "Comprar").

## Pendência para a próxima rodada

- [ ] Instalar Meta Pixel / Conversions API no site para permitir objetivo "Conversões" nos próximos anúncios (em vez de só "Tráfego").
- [ ] Depois de rodar por 5–7 dias, revisar custo por clique/cadastro antes de decidir escalar orçamento.

---
Relacionado: [05-roadmap.md](./05-roadmap.md) (estratégia do alfa/EA FC) · [08-deploy-vercel.md](./08-deploy-vercel.md) (env vars públicas do site).
