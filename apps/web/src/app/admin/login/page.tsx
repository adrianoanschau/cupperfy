import Link from 'next/link';

import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { adminPasswordConfigured } from '@/lib/admin/session';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin · Login',
  robots: { index: false, follow: false },
};

type AdminLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith('/admin') ? params.next : '/admin/interessados';
  const configured = adminPasswordConfigured();

  return (
    <div className="bg-background flex flex-1 flex-col">
      <section className="relative mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">
            cupper<span className="text-primary">fy</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="lf-glass-strong space-y-6 rounded-3xl p-6 md:p-8">
          <div className="space-y-2">
            <h1 className="font-heading text-foreground text-3xl font-bold">Acesso admin</h1>
            <p className="text-muted-foreground text-sm">
              Área restrita para gerenciar a lista de interessados e convites de check-in.
            </p>
          </div>

          {configured ? (
            <AdminLoginForm nextPath={nextPath} />
          ) : (
            <p className="text-destructive text-sm" role="alert">
              Defina <code className="text-foreground">ADMIN_PASSWORD</code> e{' '}
              <code className="text-foreground">ADMIN_SESSION_SECRET</code> (mín. 32 caracteres) no
              ambiente do app.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
