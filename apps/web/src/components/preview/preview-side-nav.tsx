'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PREVIEW_NAV } from '@/lib/preview/mock-data';

export function PreviewSideNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Atalhos do painel">
      <ul className="space-y-1">
        {PREVIEW_NAV.map((item) => {
          const current = pathname === item.href;

          return (
            <li key={item.href}>
              <Button
                variant={current ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href} aria-current={current ? 'page' : undefined}>
                  {item.label}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
