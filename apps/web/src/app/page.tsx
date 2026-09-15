import Image from 'next/image';

import { BrandMark } from '@/components/brand-mark';
import { AlphaWaitlistForm } from '@/components/landing/alpha-waitlist-form';
import { ModalityLogoStrip } from '@/components/landing/modality-logo-strip';
import { ModalityLogoImage } from '@/components/landing/modality-logos';
import { SocialFollowSection } from '@/components/landing/social-follow-section';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col">
      <SiteHeader
        links={[
          { href: '/apoiadores', label: 'Apoiar' },
          { href: '#alfa', label: 'Fundadores' },
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
            <p className="cf-brand-mark">
              <BrandMark className="text-primary text-sm font-semibold" />
            </p>
            <h1 className="font-heading text-4xl leading-[1.05] font-bold text-white md:text-6xl lg:text-7xl">
              Seu resultado fica provado, não só registrado.
            </h1>
            <p className="max-w-xl text-lg text-white/80 md:text-xl">
              Toda partida vai ao vivo e fica salva. Você começa um histórico de jogador que
              continua depois desta copa. Quem entra agora faz parte da leva fundadora — a temporada
              0 da Cupperfy.
            </p>
            <div className="cf-fade-up-delay-2 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#alfa">Quero ser jogador fundador</a>
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
              Um x1 informal resolve o jogo. A Cupperfy resolve o que fica depois: prova, histórico
              e um selo que só existe na primeira temporada.
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
                Histórico
              </p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Perfil que persiste
              </h3>
              <p className="text-muted-foreground">
                Quem se inscreve começa um histórico competitivo. Estatísticas e perfil de jogador
                continuam valendo depois desta copa — não é jogue um x1 e acabou.
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
              São dois campeonatos x1 de futebol e-sports: a Copa Cupperfy FC e a Copa Cupperfy
              eFootball. O formato abaixo vale para os dois. Números e detalhes podem ser levemente
              ajustados conforme a leva fundadora e quem confirmar presença.
            </p>
          </div>

          <ul className="grid gap-5 md:grid-cols-2">
            <li className="cf-glass space-y-3 rounded-2xl p-6 md:p-8">
              <h3 className="font-heading text-foreground text-xl font-semibold md:text-2xl">
                Copa Cupperfy FC
              </h3>
              <div className="flex h-10 items-center">
                <ModalityLogoImage id="eafc" />
              </div>
              <p className="text-muted-foreground">
                x1 no título da EA Sports. Inscrição individual.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6 md:p-8">
              <h3 className="font-heading text-foreground text-xl font-semibold md:text-2xl">
                Copa Cupperfy eFootball
              </h3>
              <div className="flex h-10 items-center">
                <ModalityLogoImage id="efootball" />
              </div>
              <p className="text-muted-foreground">x1 no título da Konami. Inscrição individual.</p>
            </li>
          </ul>

          <dl className="cf-glass grid gap-8 rounded-3xl p-8 md:grid-cols-2 md:p-10">
            <div className="space-y-2">
              <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Modalidade
              </dt>
              <dd className="text-foreground text-lg font-medium">Futebol e-sports · x1</dd>
              <p className="text-muted-foreground text-sm">
                Confrontos jogador vs jogador. Inscrição individual.
              </p>
            </div>
            <div className="space-y-2">
              <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Formato
              </dt>
              <dd className="text-foreground text-lg font-medium">Eliminação simples</dd>
              <p className="text-muted-foreground text-sm">
                Chave até a final. Perdeu, está fora. Placares e avanço na própria Cupperfy.
              </p>
            </div>
            <div className="space-y-2">
              <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Tamanho da chave
              </dt>
              <dd className="text-foreground text-lg font-medium">8 jogadores (padrão)</dd>
              <p className="text-muted-foreground text-sm">
                Também consideramos 4 ou 16 se a leva e a agenda pedirem um ajuste.
              </p>
            </div>
            <div className="space-y-2">
              <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
                Partidas
              </dt>
              <dd className="text-foreground text-lg font-medium">Melhor de 1 · seeding manual</dd>
              <p className="text-muted-foreground text-sm">
                Cada confronto decide em uma partida. A ordem na chave é definida pela organização.
              </p>
            </div>
          </dl>

          <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed md:text-base">
            <span className="text-foreground font-medium">Importante:</span> o desenho acima é a
            referência da temporada 0, não um contrato rígido. Se houver mais (ou menos) fundadores
            disponíveis na janela do evento, podemos recalibrar o tamanho de cada chave ou horários
            — sempre avisando quem estiver na leva.
          </p>

          <div>
            <Button size="lg" asChild>
              <a href="#alfa">Garantir vaga na leva fundadora</a>
            </Button>
          </div>
        </div>
      </section>

      {/* —— Como entrar na leva —— */}
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
            Três passos para entrar na leva fundadora.
          </h2>
          <ol className="grid gap-5 md:grid-cols-3">
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">01</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">Leva fundadora</h3>
              <p className="text-muted-foreground">
                Deixe seu e-mail. Você entra na temporada 0 — a primeira leva de jogadores
                fundadores.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">02</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Convite de acesso
              </h3>
              <p className="text-muted-foreground">
                Você recebe o link para criar conta, montar o perfil de jogador e se inscrever na
                Copa Cupperfy FC, na de eFootball, ou nas duas.
              </p>
            </li>
            <li className="cf-glass space-y-3 rounded-2xl p-6">
              <p className="font-heading text-primary text-4xl font-bold">03</p>
              <h3 className="font-heading text-foreground text-xl font-semibold">
                Comece seu histórico
              </h3>
              <p className="text-muted-foreground">
                Dispute com prova, acumule o perfil e ajude a definir o formato. O que você
                construir aqui não some quando a copa acaba.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* —— CTA / leva fundadora —— */}
      <section id="alfa" className="relative scroll-mt-8 overflow-hidden px-6 py-20 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--brand-200),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--brand-800),transparent_55%)]"
        />
        <div className="cf-glass-strong relative mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl p-8 md:p-10">
          <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Entre na leva fundadora.
          </h2>
          <p className="text-muted-foreground text-lg">
            Temporada 0. Você ajuda a definir o formato e carrega o selo de jogador fundador.
            Avisamos quando o acesso abrir — sem compromisso.
          </p>
          <AlphaWaitlistForm />
        </div>
      </section>

      <SocialFollowSection />

      <SiteFooter
        links={[
          { href: '/apoiadores', label: 'Apoiar' },
          { href: '/design-system', label: 'Design system' },
          { href: '#torneio', label: 'Torneios' },
          { href: '#operacao', label: 'Prova' },
          { href: '#alfa', label: 'Leva' },
          { href: '#redes', label: 'Redes' },
        ]}
      />
    </div>
  );
}
