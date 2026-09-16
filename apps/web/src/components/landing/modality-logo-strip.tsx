import {
  ComingSoonBadge,
  PHYSICAL_MODALITIES,
  VIRTUAL_MODALITIES,
  ModalityLogoImage,
} from '@/components/landing/modality-logos';
import { cn } from '@/lib/utils';

import type { MODALITY_LOGOS } from '@/components/landing/modality-logos';

type ModalityItem = (typeof MODALITY_LOGOS)[number];

function LogoRow({ items, hidden }: { items: readonly ModalityItem[]; hidden?: boolean }) {
  const sequence = [...items, ...items];

  return (
    <ul
      className="flex shrink-0 items-center gap-14 px-10 pb-7 md:gap-20 md:px-14"
      aria-hidden={hidden || undefined}
    >
      {sequence.map((logo, index) => {
        const content = (
          <span className="relative inline-flex items-center">
            <ModalityLogoImage id={logo.id} height={36} />
            {logo.comingSoon ? <ComingSoonBadge /> : null}
          </span>
        );

        return (
          <li key={`${logo.id}-${index}`}>
            {logo.comingSoon ? (
              <span className="inline-flex h-11 shrink-0 items-center opacity-70">{content}</span>
            ) : (
              <a
                href="#torneio"
                className="inline-flex h-11 shrink-0 items-center opacity-80 transition-opacity hover:opacity-100"
                tabIndex={hidden ? -1 : undefined}
              >
                {content}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function LogoMarquee({ items, reverse }: { items: readonly ModalityItem[]; reverse?: boolean }) {
  return (
    <div className="cf-logo-mask">
      <div
        className={cn(
          'cf-logo-marquee flex w-max items-center',
          reverse && 'cf-logo-marquee-reverse',
        )}
      >
        <LogoRow items={items} />
        <LogoRow items={items} hidden />
      </div>
    </div>
  );
}

export function ModalityLogoStrip() {
  return (
    <section
      aria-label="Modalidades"
      className="border-border bg-background relative overflow-hidden border-y"
    >
      <p className="text-muted-foreground font-heading px-6 pt-8 text-center text-xs font-semibold tracking-[0.22em] uppercase md:pt-10">
        Modalidades
      </p>
      <div className="flex flex-col gap-6 py-8 md:gap-8 md:py-10">
        <div className="space-y-3">
          <p className="text-muted-foreground font-heading px-6 text-center text-[11px] font-semibold tracking-[0.18em] uppercase">
            E-Sports
          </p>
          <LogoMarquee items={VIRTUAL_MODALITIES} />
        </div>
        <div className="space-y-3">
          <p className="text-muted-foreground font-heading px-6 text-center text-[11px] font-semibold tracking-[0.18em] uppercase">
            Esportes
          </p>
          <LogoMarquee items={PHYSICAL_MODALITIES} reverse />
        </div>
      </div>
    </section>
  );
}
