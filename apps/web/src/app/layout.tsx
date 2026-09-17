import { Manrope, Oxanium } from 'next/font/google';

import { SiteChat } from '@/components/chat/site-chat';
import { PwaShell } from '@/components/pwa/pwa-shell';
import { ThemeProvider } from '@/components/theme-provider';
import { APP_DESCRIPTION, APP_NAME, APP_PRODUCTION_ORIGIN, APP_THEME_COLOR } from '@/lib/brand';

import type { Metadata, Viewport } from 'next';
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
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: '%s · Cupperfy',
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: APP_NAME,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: APP_THEME_COLOR,
  viewportFit: 'cover',
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
          <PwaShell />
        </ThemeProvider>
      </body>
    </html>
  );
}
