import Image from 'next/image';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { CopyButton } from '@/components/support/copy-button';
import { Button } from '@/components/ui/button';
import { getPixConfig, getSupportContacts } from '@/lib/support/config';
import { createPixQrDataUrl } from '@/lib/support/pix-qr';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apoiadores',
  description:
    'Apoie a Leaguefy com PIX ou fale sobre parcerias e investimento no alfa de competições e-sports.',
};

export default async function ApoiadoresPage() {
  const pix = getPixConfig();
  const contacts = getSupportContacts();
  const qrDataUrl = pix.payload ? await createPixQrDataUrl(pix.payload) : null;

  const partnershipMail = contacts.email
    ? `mailto:${contacts.email}?subject=${encodeURIComponent('Parceria / investimento Leaguefy')}`
    : null;

  return (
    <div className="bg-background flex flex-1 flex-col">
      <SiteHeader
        brandAsLink
        links={[
          { href: '#doar', label: 'Doar' },
          { href: '#parcerias', label: 'Parcerias' },
        ]}
      />

      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_10%,var(--brand-400),transparent_55%),radial-gradient(ellipse_70%_60%_at_90%_80%,var(--brand-700),transparent_50%),linear-gradient(160deg,var(--ink-950),var(--ink-900))]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2240%22_height=%2240%22_viewBox=%220_0_40_40%22%3E%3Cg_fill=%22%23fff%22_fill-opacity=%220.03%22%3E%3Cpath_d=%22M0_0h1v40H0V0zm39_0h1v40h-1V0z%22/%3E%3C/g%3E%3C/svg%3E')]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-end px-4 pt-12 pb-10 md:px-8 md:pb-16">
          <div className="lf-glass-hero lf-fade-up max-w-3xl space-y-6 rounded-3xl p-6 md:p-10">
            <p className="lf-brand-mark font-heading text-primary text-sm font-semibold tracking-[0.2em] uppercase">
              Leaguefy
            </p>
            <h1 className="font-heading text-4xl leading-[1.05] font-bold text-white md:text-6xl">
              Apoie quem está construindo a arena.
            </h1>
            <p className="max-w-xl text-lg text-white/80 md:text-xl">
              Doação via PIX para acelerar o alfa — ou fale conosco sobre parceria e investimento.
            </p>
            <div className="lf-fade-up-delay-2 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#doar">Doar com PIX</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/12 hover:text-white"
                asChild
              >
                <a href="#parcerias">Parcerias e investimento</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="doar"
        className="border-border relative scroll-mt-8 overflow-hidden border-b px-6 py-20 md:px-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_0%,var(--brand-200),transparent_50%)] dark:bg-[radial-gradient(ellipse_70%_80%_at_20%_0%,var(--brand-900),transparent_55%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
              Doação via PIX
            </h2>
            <p className="text-muted-foreground text-lg">
              Escaneie o QR no app do banco ou copie o código. Beneficiário:{' '}
              <span className="text-foreground font-medium">{pix.beneficiary}</span>.
            </p>
          </div>

          <div className="lf-glass-strong grid gap-8 rounded-3xl p-6 md:grid-cols-[auto_1fr] md:items-center md:p-10">
            {qrDataUrl && pix.payload ? (
              <>
                <div className="mx-auto rounded-2xl bg-white p-4">
                  <Image
                    src={qrDataUrl}
                    alt="QR Code PIX para doação Leaguefy"
                    width={280}
                    height={280}
                    unoptimized
                    className="size-[220px] md:size-[280px]"
                  />
                </div>
                <div className="space-y-5">
                  {pix.keyLabel ? (
                    <p className="text-sm">
                      <span className="text-muted-foreground">Chave: </span>
                      <span className="font-heading text-foreground font-semibold">
                        {pix.keyLabel}
                      </span>
                    </p>
                  ) : null}
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">PIX copia e cola</p>
                    <p className="bg-muted/50 text-foreground rounded-xl px-3 py-3 font-mono text-xs leading-relaxed break-all">
                      {pix.payload}
                    </p>
                  </div>
                  <CopyButton value={pix.payload} label="Copiar código PIX" />
                </div>
              </>
            ) : (
              <div className="space-y-3 md:col-span-2">
                <p className="text-foreground font-heading text-xl font-semibold">
                  PIX ainda não configurado
                </p>
                <p className="text-muted-foreground max-w-prose">
                  Defina <code className="text-foreground">NEXT_PUBLIC_PIX_PAYLOAD</code> com o
                  código “copia e cola” do seu banco (PIX estático). Opcional:{' '}
                  <code className="text-foreground">NEXT_PUBLIC_PIX_KEY_LABEL</code> e{' '}
                  <code className="text-foreground">NEXT_PUBLIC_PIX_BENEFICIARY</code>.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button asChild>
                    <a href={contacts.whatsappUrl} target="_blank" rel="noreferrer">
                      Pedir chave no WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="parcerias" className="relative scroll-mt-8 overflow-hidden px-6 py-20 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_90%_20%,var(--brand-100),transparent_45%)] dark:bg-[radial-gradient(ellipse_60%_70%_at_90%_20%,var(--brand-950),transparent_50%)]"
        />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
              Parcerias e investimento
            </h2>
            <p className="text-muted-foreground text-lg">
              Patrocínio de torneio, integração de produto, mídia ou investimento no alfa — fale
              direto com o time.
            </p>
          </div>

          <ul className="lf-glass grid gap-6 rounded-3xl p-6 md:grid-cols-3 md:p-8">
            <li className="space-y-3">
              <h3 className="font-heading text-foreground text-lg font-semibold">WhatsApp</h3>
              <p className="text-muted-foreground text-sm">
                Resposta rápida para apoio e propostas.
              </p>
              <Button variant="outline" asChild>
                <a href={contacts.whatsappUrl} target="_blank" rel="noreferrer">
                  Abrir WhatsApp
                </a>
              </Button>
            </li>
            <li className="space-y-3">
              <h3 className="font-heading text-foreground text-lg font-semibold">Telegram</h3>
              <p className="text-muted-foreground text-sm">Canal direto com o fundador.</p>
              <Button variant="outline" asChild>
                <a href={contacts.telegramUrl} target="_blank" rel="noreferrer">
                  Abrir Telegram
                </a>
              </Button>
            </li>
            <li className="space-y-3">
              <h3 className="font-heading text-foreground text-lg font-semibold">E-mail</h3>
              <p className="text-muted-foreground text-sm">
                Para decks, termos e conversas formais.
              </p>
              {partnershipMail && contacts.email ? (
                <Button variant="outline" asChild>
                  <a href={partnershipMail}>{contacts.email}</a>
                </Button>
              ) : (
                <p className="text-muted-foreground text-xs">
                  Configure <code className="text-foreground">NEXT_PUBLIC_SUPPORT_EMAIL</code>.
                </p>
              )}
            </li>
          </ul>
        </div>
      </section>

      <SiteFooter
        links={[
          { href: '/', label: 'Início' },
          { href: '/#alfa', label: 'Alfa' },
        ]}
      />
    </div>
  );
}
