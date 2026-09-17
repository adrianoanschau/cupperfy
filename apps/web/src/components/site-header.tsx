import Link from 'next/link';

import { BrandLockup } from '@/components/brand-mark';
import { SiteHeaderMobileNav } from '@/components/site-header-mobile-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button, buttonVariants } from '@/components/ui/button';
import { UserMenu } from '@/components/user-menu';
import { getHeaderAccount } from '@/lib/auth/account';
import { cn } from '@/lib/utils';

type HeaderLink = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  /** Quando true, a marca aponta para `/`; senão é só texto (home). */
  brandAsLink?: boolean;
  links: HeaderLink[];
};

function isHashLink(href: string) {
  return href.startsWith('#') || href.startsWith('/#');
}

function NavLink({ link, className }: { link: HeaderLink; className?: string }) {
  const classes = cn(
    buttonVariants({ variant: 'ghost', size: 'sm' }),
    'text-white hover:bg-white/10 hover:text-white',
    className,
  );

  if (isHashLink(link.href)) {
    return (
      <a href={link.href} className={classes}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={classes}>
      {link.label}
    </Link>
  );
}

export async function SiteHeader({ brandAsLink = false, links }: SiteHeaderProps) {
  const account = await getHeaderAccount();
  const navLinks = links.filter((link) => link.href !== '/login' && link.label !== 'Entrar');
  const brand = <BrandLockup className="h-7 md:h-8" priority />;

  return (
    <header className="cf-glass-nav fixed inset-x-0 top-0 z-50 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] md:px-8">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
        {brandAsLink ? (
          <Link href="/" className="inline-flex min-w-0 shrink-0 items-center">
            {brand}
          </Link>
        ) : (
          <span className="inline-flex min-w-0 shrink-0 items-center">{brand}</span>
        )}

        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
            {navLinks.map((link) => (
              <NavLink key={link.href + link.label} link={link} />
            ))}
          </nav>

          {navLinks.length > 0 ? (
            <SiteHeaderMobileNav>
              {navLinks.map((link) => (
                <NavLink
                  key={link.href + link.label}
                  link={link}
                  className="w-full justify-start"
                />
              ))}
            </SiteHeaderMobileNav>
          ) : null}

          <ThemeToggle className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white" />

          {account ? (
            <UserMenu account={account} />
          ) : (
            <Button asChild size="sm" className="text-primary-foreground">
              <Link href="/login">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
