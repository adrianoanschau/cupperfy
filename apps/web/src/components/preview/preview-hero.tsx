import { Badge } from '@/components/ui/badge';

type PreviewHeroProps = {
  kicker?: string;
  title: string;
  description: string;
  phase2?: boolean;
};

export function PreviewHero({ kicker, title, description, phase2 = false }: PreviewHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pt-24 pb-10 md:px-8 md:pt-28 md:pb-14">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_10%,var(--brand-400),transparent_55%),radial-gradient(ellipse_70%_60%_at_90%_80%,var(--brand-700),transparent_50%),linear-gradient(160deg,var(--ink-950),var(--ink-900))]"
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="cf-glass-hero max-w-3xl space-y-4 rounded-3xl p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-white/30 text-white">
              Demonstração
            </Badge>
            {phase2 ? (
              <Badge>Em breve</Badge>
            ) : (
              <Badge variant="outline" className="border-white/30 text-white">
                Temporada 0
              </Badge>
            )}
          </div>
          {kicker ? (
            <p className="font-heading text-primary text-sm font-semibold tracking-wide uppercase">
              {kicker}
            </p>
          ) : null}
          <h1 className="font-heading text-3xl font-bold text-white md:text-5xl">{title}</h1>
          <p className="max-w-xl text-lg text-white/80">{description}</p>
        </div>
      </div>
    </section>
  );
}
