import Image from 'next/image';
import Link from 'next/link';

import { AlphaWaitlistForm } from '@/components/landing/alpha-waitlist-form';
import { ModalityLogoStrip } from '@/components/landing/modality-logo-strip';
import { SeasonCupTabs } from '@/components/landing/season-cup-tabs';
import { SocialFollowSection } from '@/components/landing/social-follow-section';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { YoutubeIcon } from '@/components/social-icons';
import { Button } from '@/components/ui/button';
import { FOUNDER_NAME } from '@/lib/site-config';
import { getBrandSocialLinks } from '@/lib/support/social';

export default function Home() {
  const { youtubeUrl } = getBrandSocialLinks();

  return (
    <div className="bg-background flex flex-1 flex-col">
      <SiteHeader
        links={[
          { href: '/apoiadores', label: 'Apoiar' },
          { href: '/preview', label: 'Prévia' },
          { href: '#alfa', label: 'Lista' },
        ]}
      />

      {/* —— Hero (uma composição) —— */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="cf-kenburns object-cover object-center"
        />
        <div
          aria-hidden
          className="from-ink-950/90 via-ink-950/55 to-brand-900/25 absolute inset-0 bg-gradient-to-r"
        />
        <div
          aria-hidden
          className="from-ink-950 to-ink-950/40 absolute inset-0 bg-gradient-to-t via-transparent"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-end px-4 pt-12 pb-10 md:px-8 md:pb-16">
          <div className="cf-glass-hero cf-fade-up max-w-3xl space-y-6 rounded-3xl p-6 md:p-10">
            <h1 className="font-heading text-4xl leading-[1.05] font-bold text-white md:text-6xl lg:text-7xl">
              Você disputa um campeonato.{' '}
              <span className="text-primary">Você entra numa comunidade.</span>
            </h1>
            <p className="max-w-xl text-lg text-white/80 md:text-xl">
              Toda partida vai ao vivo e fica salva. E o que você abre aqui não é só uma copa: é o
              começo de uma comunidade — perfil, pessoas e, no caminho, rede social.
            </p>
            <div className="cf-fade-up-delay-2 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#alfa">Entrar na lista de interesse</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12 hover:text-white"
                asChild
              >
                <a href="#torneio">Como serão os torneios</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* —— Por que competir aqui —— */}
      <section
        id="por-que"
        className="border-border relative scroll-mt-8 overflow-hidden border-b px-6 py-20 md:px-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_10%_20%,var(--brand-200),transparent_50%)] dark:bg-[radial-gradient(ellipse_70%_80%_at_10%_20%,var(--brand-900),transparent_55%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
              Por que competir aqui, e não em outro lugar.
            </h2>
            <p className="text-muted-foreground text-lg">
              Um x1 informal resolve o jogo. A Cupperfy constrói o que fica: resultado com prova e
              uma comunidade — não um evento que some no dia seguinte.
            </p>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Prova
              </p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Resultado auditável
              </h3>
              <p className="text-muted-foreground">
                Transmissão ao vivo e VOD obrigatórios. Disputa de placar sem prova não deveria
                decidir um campeonato — aqui o vídeo é a referência.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Comunidade
              </p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Mais que uma plataforma de copas
              </h3>
              <p className="text-muted-foreground">
                Estamos criando um lugar para quem compete se encontrar de novo. Perfil que
                permanece, pessoas em volta das copas e, no caminho, recursos de rede social. Esta
                temporada é o ponto de partida, não o produto inteiro.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Temporada 0
              </p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Selo de fundador
              </h3>
              <p className="text-muted-foreground">
                A primeira leva ajuda a definir o formato e carrega o selo de jogador fundador. Isso
                só existe agora.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <ModalityLogoStrip />

      {/* —— Como a plataforma opera —— */}
      <section
        id="operacao"
        className="border-border relative scroll-mt-8 overflow-hidden border-b px-6 py-20 md:px-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_0%_50%,var(--brand-100),transparent_50%)] dark:bg-[radial-gradient(ellipse_65%_70%_at_0%_50%,var(--brand-950),transparent_55%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
              Como o resultado fica provado.
            </h2>
            <p className="text-muted-foreground text-lg">
              Porque disputa de placar sem prova não deveria decidir um campeonato. Na Cupperfy o
              placar oficial existe — e o vídeo mostra o que aconteceu.
            </p>
          </div>

          <ul className="grid gap-5 md:grid-cols-3">
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Transmissão
              </p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Toda partida no YouTube
              </h3>
              <p className="text-muted-foreground">
                Todos os confrontos precisam ser transmitidos ao vivo no YouTube. Assim a
                organização acompanha o jogo e confere se as regras foram cumpridas — sem depender
                só do relato de quem estava na sala.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Arquivo
              </p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                VOD para consulta
              </h3>
              <p className="text-muted-foreground">
                A live deve permanecer salva. Se surgir dúvida de placar, conduta ou regra, o vídeo
                é a referência — no mesmo dia ou semanas depois.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Resultado
              </p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Placar oficial na Cupperfy
              </h3>
              <p className="text-muted-foreground">
                O avanço na chave continua na plataforma. A transmissão prova o que aconteceu; a
                Cupperfy registra o que vale na tabela.
              </p>
            </li>
          </ul>

          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed md:text-base">
            <span className="text-foreground font-medium">Na prática:</span> o passo a passo da live
            — canal, qualidade e onde colar o link — entra no convite e na área logada. Aqui o
            recado é o princípio: partida sem transmissão não entra no fluxo oficial.
          </p>
        </div>
      </section>

      {/* —— Torneios da temporada 0 —— */}
      <section
        id="torneio"
        className="border-border relative scroll-mt-8 overflow-hidden border-b px-6 py-20 md:px-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_100%,var(--brand-200),transparent_55%)] dark:bg-[radial-gradient(ellipse_75%_65%_at_50%_100%,var(--brand-800),transparent_55%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
          <div className="max-w-2xl space-y-4">
            <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
              Os torneios da temporada 0
            </h2>
            <p className="text-muted-foreground text-lg">
              Os campeonatos acontecem um de cada vez. O primeiro é a Copa Cupperfy FC, no EA FC.
              Depois, em sequência, entra a Copa Cupperfy eFootball. Clique na copa para ver o
              formato.
            </p>
          </div>

          <SeasonCupTabs />

          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed md:text-base">
            <span className="text-foreground font-medium">Importante:</span> o desenho acima é a
            referência da temporada 0, não um contrato rígido. Se houver mais (ou menos) pessoas
            disponíveis na janela do evento, podemos recalibrar o tamanho da chave ou os horários —
            sempre avisando quem estiver na lista.
          </p>

          <div>
            <Button size="lg" asChild>
              <a href="#alfa">Entrar na lista de interesse</a>
            </Button>
          </div>
        </div>
      </section>

      {/* —— Como entrar —— */}
      <section
        id="como-funciona"
        className="border-border relative scroll-mt-8 overflow-hidden border-b px-6 py-20 md:px-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_90%_80%,var(--brand-100),transparent_45%)] dark:bg-[radial-gradient(ellipse_60%_70%_at_90%_80%,var(--brand-950),transparent_50%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12">
          <h2 className="font-heading text-foreground max-w-xl text-3xl font-bold md:text-4xl">
            Da lista ao dia do campeonato.
          </h2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">01</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">Cadastro</h3>
              <p className="text-muted-foreground">
                Deixe seu e-mail na lista de interesse. Você fica aguardando — sem compromisso.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">02</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Convite pessoal
              </h3>
              <p className="text-muted-foreground">
                Enviamos um link exclusivo para você confirmar presença. Só quem recebe o convite
                entra no fluxo.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">03</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Dia do campeonato
              </h3>
              <p className="text-muted-foreground">
                O primeiro é de EA FC. Neste lançamento o campeonato inteiro acontece num único dia.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">04</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">Final ao vivo</h3>
              <p className="text-muted-foreground">
                Transmissão no YouTube da Cupperfy, narrada por {FOUNDER_NAME}.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* —— Veja como vai ficar —— */}
      <section
        id="preview"
        className="border-border relative scroll-mt-8 overflow-hidden border-b px-6 py-20 md:px-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_80%_20%,var(--brand-200),transparent_50%)] dark:bg-[radial-gradient(ellipse_70%_80%_at_80%_20%,var(--brand-900),transparent_55%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
          <div className="max-w-2xl space-y-4">
            <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
              Demonstração
            </p>
            <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
              Veja como a Cupperfy vai ficar
            </h2>
            <p className="text-muted-foreground text-lg">
              Páginas de uma copa de exemplo: chave, perfil, agenda e o rumo da comunidade.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/preview">Abrir a demonstração</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/preview/competicao">Ver a chave x1</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* —— CTA / lista de interesse —— */}
      <section id="alfa" className="relative scroll-mt-8 overflow-hidden px-6 py-20 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--brand-200),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--brand-800),transparent_55%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
              Entre na lista de interesse.
            </h2>
            <p className="text-muted-foreground text-lg">
              O primeiro campeonato é de EA FC e acontece todo em um único dia. Quem se cadastra
              entra numa lista de espera e recebe um convite pessoal — um link exclusivo para
              confirmar presença. A data será discutida e comunicada com antecedência. A final vai
              ao vivo no canal da Cupperfy no YouTube, com narração de {FOUNDER_NAME}.
            </p>
            <div>
              <Button size="lg" variant="outline" asChild>
                <a href={youtubeUrl} target="_blank" rel="noreferrer">
                  <YoutubeIcon className="size-5" />
                  Canal da Cupperfy no YouTube
                </a>
              </Button>
            </div>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li className="cf-glass space-y-2 rounded-2xl p-5">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                01 · Cadastro
              </p>
              <p className="text-muted-foreground text-sm">
                Deixe o e-mail. Você fica na lista, aguardando o convite.
              </p>
            </li>
            <li className="cf-glass space-y-2 rounded-2xl p-5">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                02 · Convite pessoal
              </p>
              <p className="text-muted-foreground text-sm">
                Um link só seu chega no e-mail para confirmar presença.
              </p>
            </li>
            <li className="cf-glass space-y-2 rounded-2xl p-5">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                03 · Um único dia
              </p>
              <p className="text-muted-foreground text-sm">
                Campeonato de EA FC, um de cada vez. A data chega com antecedência para quem está na
                lista.
              </p>
            </li>
            <li className="cf-glass space-y-2 rounded-2xl p-5">
              <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                04 · Final ao vivo
              </p>
              <p className="text-muted-foreground text-sm">
                YouTube da Cupperfy, narrada por {FOUNDER_NAME}.
              </p>
            </li>
          </ol>

          <div className="cf-glass-strong mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl p-8 md:p-10">
            <p className="font-heading text-foreground text-xl font-semibold">
              Deixe seu e-mail para o convite.
            </p>
            <AlphaWaitlistForm />
          </div>
        </div>
      </section>

      <SocialFollowSection />

      <SiteFooter
        links={[
          { href: '/apoiadores', label: 'Apoiar' },
          { href: '/preview', label: 'Prévia' },
          { href: '/design-system', label: 'Design system' },
          { href: '#torneio', label: 'Torneios' },
          { href: '#operacao', label: 'Prova' },
          { href: '#alfa', label: 'Lista' },
          { href: '/login', label: 'Entrar' },
          { href: '#redes', label: 'Redes' },
        ]}
      />
    </div>
  );
}
