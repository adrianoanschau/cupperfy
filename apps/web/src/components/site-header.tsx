import Link from 'next/link';

import { BrandLockup } from '@/components/brand-mark';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

type HeaderLink = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  /** Quando true, a marca aponta para `/`; senão é só texto (home). */
  brandAsLink?: boolean;
  links: HeaderLink[];
};

export function SiteHeader({ brandAsLink = false, links }: SiteHeaderProps) {
  const brand = <BrandLockup className="h-7 md:h-8" priority />;

  return (
    <header className="cf-glass-nav fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        {brandAsLink ? (
          <Link href="/" className="inline-flex items-center">
            {brand}
          </Link>
        ) : (
          <span className="inline-flex items-center">{brand}</span>
        )}
        <div className="flex flex-wrap items-center justify-end gap-2">
          {links.map((link) => (
            <Button
              key={link.href + link.label}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              {link.href.startsWith('#') || link.href.startsWith('/#') ? (
                <a href={link.href}>{link.label}</a>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )}
            </Button>
          ))}
          <ThemeToggle className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white" />
        </div>
      </div>
    </header>
  );
}
