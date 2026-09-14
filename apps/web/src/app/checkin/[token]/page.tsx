import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BrandMark } from '@/components/brand-mark';
import { AlphaCheckinForm } from '@/components/checkin/alpha-checkin-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { getCheckinInviteByToken, getCheckinSlotIdsForInvite } from '@/lib/checkin/invites';
import { CHECKIN_EVENT, CHECKIN_SLOTS, getOpenCheckinSlots } from '@/lib/checkin/slots';
import { getSupportContacts } from '@/lib/support/config';

import type { Metadata } from 'next';

type CheckinTokenPageProps = {
  params: Promise<{ token: string }>;
};

export const metadata: Metadata = {
  title: 'Check-in do torneio alfa',
  description: 'Confirme as janelas em que você pode jogar o x1 de teste da Cupperfy.',
  robots: { index: false, follow: false },
};

export default async function CheckinTokenPage({ params }: CheckinTokenPageProps) {
  const { token } = await params;
  const invite = await getCheckinInviteByToken(token);

  if (!invite) {
    notFound();
  }

  const initialSlotIds = await getCheckinSlotIdsForInvite(invite.id);
  const openSlots = getOpenCheckinSlots();
  const contacts = getSupportContacts();

  return (
    <div className="bg-background flex flex-1 flex-col">
      <section className="relative overflow-hidden px-6 pt-6 pb-16 md:px-10 md:pt-8 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,color-mix(in_oklch,var(--brand-400)_35%,transparent),transparent_60%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,color-mix(in_oklch,var(--brand-800)_40%,transparent),transparent_60%)]"
        />

        <header className="cf-glass-nav relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
          <Link href="/">
            <BrandMark className="text-foreground text-xl" />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">Início</Link>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <div className="cf-glass-strong relative z-10 mx-auto mt-10 w-full max-w-3xl rounded-3xl p-6 md:mt-14 md:p-10">
          <p className="inline-flex items-center gap-2">
            <BrandMark className="text-primary text-sm font-semibold" />
            <span className="text-muted-foreground text-sm">· alfa</span>
          </p>
          <h1 className="font-heading text-foreground mt-3 text-3xl font-bold md:text-4xl">
            {CHECKIN_EVENT.title}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">{CHECKIN_EVENT.subtitle}</p>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            Convite pessoal de {invite.name?.trim() || invite.email}. A chave do torneio (em geral 8
            jogadores, x1) pode ser levemente ajustada conforme quem confirmar disponibilidade.
          </p>

          <AlphaCheckinForm
            token={invite.token}
            name={invite.name}
            email={invite.email}
            slots={CHECKIN_SLOTS}
            initialSlotIds={initialSlotIds}
            submissionsOpen={CHECKIN_EVENT.submissionsOpen && openSlots.length > 0}
          />
        </div>

        <p className="text-muted-foreground relative z-10 mx-auto mt-8 max-w-3xl text-center text-sm">
          Dúvida de horário?{' '}
          <a
            href={contacts.whatsappUrl}
            className="text-primary hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>{' '}
          ·{' '}
          <a
            href={contacts.telegramUrl}
            className="text-primary hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>{' '}
          ·{' '}
          <a href={`mailto:${contacts.email}`} className="text-primary hover:underline">
            {contacts.email}
          </a>
        </p>
      </section>
    </div>
  );
}
