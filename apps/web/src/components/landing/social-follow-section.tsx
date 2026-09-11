import { InstagramIcon, YoutubeIcon } from '@/components/social-icons';
import { getBrandSocialLinks } from '@/lib/support/social';

export function SocialFollowSection() {
  const social = getBrandSocialLinks();

  return (
    <section
      id="redes"
      className="border-border relative scroll-mt-8 overflow-hidden border-t px-6 py-20 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,var(--brand-100),transparent_55%)] dark:bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,var(--brand-900),transparent_55%)]"
      />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <div className="max-w-xl space-y-3">
          <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
            Nos siga nas nossas redes
          </h2>
          <p className="text-muted-foreground text-lg">
            Bastidores do alfa, avisos de ondas e conteúdo de competição no Instagram e no YouTube.
          </p>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          <li>
            <a
              href={social.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-primary focus-visible:ring-ring inline-flex size-16 items-center justify-center rounded-2xl transition-colors focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Seguir Cupperfy no Instagram"
            >
              <InstagramIcon className="size-10" />
            </a>
          </li>
          <li>
            <a
              href={social.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:text-primary focus-visible:ring-ring inline-flex size-16 items-center justify-center rounded-2xl transition-colors focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Seguir Cupperfy no YouTube"
            >
              <YoutubeIcon className="size-10" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
