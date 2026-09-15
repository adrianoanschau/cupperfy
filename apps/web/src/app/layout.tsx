import { Manrope, Oxanium } from 'next/font/google';

import { SiteChat } from '@/components/chat/site-chat';
import { ThemeProvider } from '@/components/theme-provider';
import { APP_PRODUCTION_ORIGIN } from '@/lib/brand';

import type { Metadata } from 'next';
/* Resolve via Node (monorepo/Vercel); @import no CSS quebra com package exports. */
import 'shadcn/tailwind.css';
import './globals.css';

const fontDisplay = Oxanium({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const fontBody = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL?.trim() || APP_PRODUCTION_ORIGIN),
  title: {
    default: 'Cupperfy',
    template: '%s · Cupperfy',
  },
  description:
    'Resultado com prova e uma comunidade que continua. Entre na leva fundadora da Cupperfy — Copa Cupperfy FC e Copa Cupperfy eFootball.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SiteChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
