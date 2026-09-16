'use client';

import { ChevronRightIcon } from 'lucide-react';

import { ModalityLogoImage, type ModalityLogoId } from '@/components/landing/modality-logos';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FOUNDER_NAME } from '@/lib/site-config';
import { cn } from '@/lib/utils';

const triggerClassName = cn(
  'group/cup relative h-full w-full cursor-pointer flex-col items-start justify-start gap-3 rounded-2xl p-5 pb-8 text-left whitespace-normal sm:p-6 sm:pb-8',
  'border border-transparent bg-transparent shadow-none transition-colors',
  'hover:bg-background/60 hover:text-foreground',
  'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
  'data-[state=active]:border-primary dark:data-[state=active]:border-primary dark:data-[state=active]:bg-input/40',
  'after:pointer-events-none after:absolute after:inset-x-6 after:bottom-3 after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity',
  'data-[state=active]:after:opacity-100',
);

function CupFacts({
  summary,
  sport,
  sportNote,
}: {
  summary: string;
  sport: string;
  sportNote: string;
}) {
  return (
    <div className="cf-glass space-y-8 rounded-3xl p-8 md:p-10">
      <p className="text-muted-foreground text-lg">{summary}</p>
      <dl className="grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
            Modalidade
          </dt>
          <dd className="text-foreground text-lg font-medium">{sport}</dd>
          <p className="text-muted-foreground text-sm">{sportNote}</p>
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
            Quando
          </dt>
          <dd className="text-foreground text-lg font-medium">Um único dia</dd>
          <p className="text-muted-foreground text-sm">
            Neste lançamento o campeonato inteiro acontece no mesmo dia. A data será discutida e
            comunicada com antecedência a quem estiver na lista.
          </p>
        </div>
        <div className="space-y-2">
          <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
            Tamanho da chave
          </dt>
          <dd className="text-foreground text-lg font-medium">8 jogadores (padrão)</dd>
          <p className="text-muted-foreground text-sm">
            Também consideramos 4 ou 16 se a lista e a agenda pedirem um ajuste.
          </p>
        </div>
        <div className="space-y-2">
          <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
            Partidas
          </dt>
          <dd className="text-foreground text-lg font-medium">Melhor de 3 · seeding manual</dd>
          <p className="text-muted-foreground text-sm">
            Os jogadores disputam uma partida atrás da outra até alguém vencer duas. A ordem na
            chave é definida pela organização.
          </p>
        </div>
        <div className="space-y-2">
          <dt className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
            Final
          </dt>
          <dd className="text-foreground text-lg font-medium">Ao vivo no YouTube</dd>
          <p className="text-muted-foreground text-sm">
            Transmissão no canal da Cupperfy, com narração de {FOUNDER_NAME}.
          </p>
        </div>
      </dl>
    </div>
  );
}

function CupTrigger({
  value,
  kicker,
  title,
  logoId,
}: {
  value: string;
  kicker: string;
  title: string;
  logoId: ModalityLogoId;
}) {
  return (
    <TabsTrigger value={value} className={triggerClassName}>
      <span className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
        {kicker}
      </span>
      <span className="font-heading text-foreground text-xl font-semibold md:text-2xl">
        {title}
      </span>
      <span className="flex h-10 items-center">
        <ModalityLogoImage id={logoId} />
      </span>
      <span className="text-muted-foreground group-data-[state=active]/cup:text-primary mt-1 inline-flex items-center gap-1 text-sm font-medium">
        <span className="group-data-[state=active]/cup:hidden">Ver formato</span>
        <span className="hidden group-data-[state=active]/cup:inline">Em exibição</span>
        <ChevronRightIcon className="size-4 group-data-[state=active]/cup:hidden" />
      </span>
    </TabsTrigger>
  );
}

export function SeasonCupTabs() {
  return (
    <Tabs defaultValue="fc" className="w-full flex-col gap-6">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          Clique numa copa para ver o formato desta edição.
        </p>
        <TabsList className="cf-glass grid h-auto w-full grid-cols-1 items-stretch gap-1 rounded-3xl p-1.5 sm:grid-cols-2">
          <CupTrigger value="fc" kicker="Primeiro" title="Copa Cupperfy FC" logoId="eafc" />
          <CupTrigger
            value="efootball"
            kicker="Em seguida"
            title="Copa Cupperfy eFootball"
            logoId="efootball"
          />
        </TabsList>
      </div>

      <TabsContent value="fc" className="w-full min-w-0 text-base">
        <CupFacts
          summary="x1 de EA FC. Inscrição individual. Primeiro campeonato da temporada 0."
          sport="EA FC · x1"
          sportNote="Confrontos jogador vs jogador. Inscrição individual."
        />
      </TabsContent>

      <TabsContent value="efootball" className="w-full min-w-0 text-base">
        <CupFacts
          summary="x1 no título da Konami. Entra depois do EA FC, não ao mesmo tempo."
          sport="eFootball · x1"
          sportNote="Confrontos jogador vs jogador. Inscrição individual."
        />
      </TabsContent>
    </Tabs>
  );
}
