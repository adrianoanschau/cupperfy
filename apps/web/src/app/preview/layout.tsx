import { PreviewShell } from '@/components/preview/preview-shell';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Prévia do produto',
  description: 'Demonstração da Cupperfy: chave x1, perfil, agenda e o rumo da comunidade.',
  robots: { index: false, follow: true },
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return <PreviewShell>{children}</PreviewShell>;
}
