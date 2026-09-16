import { PreviewShell } from '@/components/preview/preview-shell';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Feed',
  description: 'Demonstração da Cupperfy: feed, chave x1, perfil, agenda e classificação.',
  robots: { index: false, follow: true },
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return <PreviewShell>{children}</PreviewShell>;
}
