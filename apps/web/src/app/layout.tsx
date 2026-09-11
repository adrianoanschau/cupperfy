import { Manrope, Oxanium } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

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
  title: {
    default: 'Leaguefy',
    template: '%s · Leaguefy',
  },
  description: 'Plataforma de gestão de competições — MVP x1 futebol e-sports',
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
        </ThemeProvider>
      </body>
    </html>
  );
}
