import Link from 'next/link';

import { InstagramIcon, YoutubeIcon } from '@/components/social-icons';
import { getBrandSocialLinks } from '@/lib/support/social';

type FooterLink = {
  href: string;
  label: string;
};

type SiteFooterProps = {
  links: FooterLink[];
};

export function SiteFooter({ links }: SiteFooterProps) {
  const social = getBrandSocialLinks();

  return (
    <footer className="lf-glass border-border mt-auto border-0 border-t px-6 py-8 md:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4">
        <p className="font-heading text-foreground text-sm font-bold tracking-tight">
          league<span className="text-primary">fy</span>
        </p>
        <nav className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
          {links.map((link) =>
            link.href.startsWith('#') || link.href.startsWith('/#') ? (
              <a key={link.href + link.label} href={link.href} className="hover:text-foreground">
                {link.label}
              </a>
            ) : (
              <Link key={link.href + link.label} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ),
          )}
          <a
            href={social.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground inline-flex"
            aria-label="Instagram Leaguefy"
          >
            <InstagramIcon className="size-5" />
          </a>
          <a
            href={social.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground inline-flex"
            aria-label="YouTube Leaguefy"
          >
            <YoutubeIcon className="size-5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
