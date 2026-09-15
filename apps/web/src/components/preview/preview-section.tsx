import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type PreviewSectionProps = {
  children: ReactNode;
  className?: string;
  tone?: 'start' | 'end';
};

export function PreviewSection({ children, className, tone = 'start' }: PreviewSectionProps) {
  const wash =
    tone === 'end'
      ? 'bg-[radial-gradient(ellipse_70%_80%_at_90%_80%,var(--brand-200),transparent_50%)] dark:bg-[radial-gradient(ellipse_70%_80%_at_90%_80%,var(--brand-900),transparent_55%)]'
      : 'bg-[radial-gradient(ellipse_70%_80%_at_10%_20%,var(--brand-200),transparent_50%)] dark:bg-[radial-gradient(ellipse_70%_80%_at_10%_20%,var(--brand-900),transparent_55%)]';

  return (
    <section
      className={cn(
        'border-border relative overflow-hidden border-b px-4 py-12 md:px-8 md:py-16',
        className,
      )}
    >
      <div aria-hidden className={cn('pointer-events-none absolute inset-0', wash)} />
      <div className="relative mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
