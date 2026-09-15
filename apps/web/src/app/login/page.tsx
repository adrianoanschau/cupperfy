import Link from 'next/link';

import { LoginForm } from '@/components/auth/auth-forms';
import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { redirectIfAuthenticated } from '@/lib/auth/account';
import { authPageErrorMessage } from '@/lib/auth/errors';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar',
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  await redirectIfAuthenticated();
  const params = await searchParams;

  return (
    <AuthPageShell
      title="Entrar"
      description="Acesse sua conta para continuar o histórico e a temporada 0."
    >
      <LoginForm initialError={authPageErrorMessage(params.error)} />
      <p className="text-muted-foreground text-sm">
        Ainda não tem conta?{' '}
        <Link href="/cadastro" className="text-primary font-medium hover:underline">
          Criar conta
        </Link>
      </p>
    </AuthPageShell>
  );
}
