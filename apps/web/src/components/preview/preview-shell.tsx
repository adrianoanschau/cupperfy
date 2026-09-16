import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

import type { ReactNode } from 'react';

const HEADER_LINKS = [
  { href: '/preview', label: 'Feed' },
  { href: '/preview/competicao', label: 'Copa' },
  { href: '/preview/agenda', label: 'Agenda' },
  { href: '/preview/classificacao', label: 'Tabela' },
];

const FOOTER_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/preview', label: 'Feed' },
  { href: '/preview/competicao', label: 'Copa' },
  { href: '/preview/agenda', label: 'Agenda' },
  { href: '/preview/classificacao', label: 'Classificação' },
  { href: '/#alfa', label: 'Leva' },
];

export function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background flex flex-1 flex-col">
      <SiteHeader brandAsLink links={HEADER_LINKS} />
      {children}
      <SiteFooter links={FOOTER_LINKS} />
    </div>
  );
}
