import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const brandSwatches = [
  { step: '50', className: 'bg-brand-50' },
  { step: '100', className: 'bg-brand-100' },
  { step: '200', className: 'bg-brand-200' },
  { step: '300', className: 'bg-brand-300' },
  { step: '400', className: 'bg-brand-400' },
  { step: '500', className: 'bg-brand-500' },
  { step: '600', className: 'bg-brand-600' },
  { step: '700', className: 'bg-brand-700' },
  { step: '800', className: 'bg-brand-800' },
  { step: '900', className: 'bg-brand-900' },
  { step: '950', className: 'bg-brand-950' },
] as const;

const inkSwatches = [
  { step: '50', className: 'bg-ink-50' },
  { step: '100', className: 'bg-ink-100' },
  { step: '200', className: 'bg-ink-200' },
  { step: '300', className: 'bg-ink-300' },
  { step: '400', className: 'bg-ink-400' },
  { step: '500', className: 'bg-ink-500' },
  { step: '600', className: 'bg-ink-600' },
  { step: '700', className: 'bg-ink-700' },
  { step: '800', className: 'bg-ink-800' },
  { step: '900', className: 'bg-ink-900' },
  { step: '950', className: 'bg-ink-950' },
] as const;

const semantic = [
  { name: 'background', className: 'bg-background text-foreground border' },
  { name: 'primary', className: 'bg-primary text-primary-foreground' },
  { name: 'secondary', className: 'bg-secondary text-secondary-foreground' },
  { name: 'accent', className: 'bg-accent text-accent-foreground' },
  { name: 'muted', className: 'bg-muted text-muted-foreground' },
  { name: 'destructive', className: 'bg-destructive text-white' },
] as const;

export const metadata = {
  title: 'Design system',
};

export default function DesignSystemPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-14 px-6 py-12 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="font-heading text-primary text-sm font-semibold tracking-[0.2em] uppercase">
            Leaguefy
          </p>
          <h1 className="font-heading text-4xl font-bold">Design system</h1>
          <p className="text-muted-foreground max-w-xl">
            Tokens de marca (laranja + preto), tipografia e componentes base do shadcn. Referência
            viva — ver também docs/09-design-system.md.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/">Voltar</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Brand · orange</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {brandSwatches.map((swatch) => (
            <div key={swatch.step} className="overflow-hidden rounded-lg border">
              <div className={`h-16 ${swatch.className}`} />
              <p className="text-muted-foreground px-2 py-1.5 font-mono text-xs">
                brand-{swatch.step}
              </p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          Institucional: <code className="text-foreground">brand-500</code> →{' '}
          <code className="text-foreground">primary</code>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Ink · black</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {inkSwatches.map((swatch) => (
            <div key={swatch.step} className="overflow-hidden rounded-lg border">
              <div className={`h-16 ${swatch.className}`} />
              <p className="text-muted-foreground px-2 py-1.5 font-mono text-xs">
                ink-{swatch.step}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Semânticos (shadcn)</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {semantic.map((token) => (
            <div
              key={token.name}
              className={`rounded-lg px-4 py-6 text-sm font-medium ${token.className}`}
            >
              {token.name}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Tipografia</h2>
        <div className="bg-card space-y-3 rounded-xl border p-6">
          <p className="font-heading text-4xl font-bold">Oxanium · display</p>
          <p className="text-lg">Manrope · corpo — leitura longa, UI e formulários.</p>
          <p className="text-muted-foreground text-sm">
            Títulos usam <code>font-heading</code>; o restante herda <code>font-sans</code>.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Botões</h2>
        <div className="flex flex-wrap gap-3">
          <Button type="button">Primary</Button>
          <Button type="button" variant="secondary">
            Secondary
          </Button>
          <Button type="button" variant="outline">
            Outline
          </Button>
          <Button type="button" variant="ghost">
            Ghost
          </Button>
          <Button type="button" variant="destructive">
            Destructive
          </Button>
        </div>
      </section>
    </div>
  );
}
