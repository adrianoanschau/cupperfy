import Link from 'next/link';

import { SignUpForm } from '@/components/auth/auth-forms';
import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { redirectIfAuthenticated } from '@/lib/auth/account';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar conta',
};

export default async function SignUpPage() {
  await redirectIfAuthenticated();

  return (
    <AuthPageShell
      title="Criar conta"
      description="Cadastre-se com e-mail ou Discord. Depois você escolhe se joga, organiza, ou os dois."
    >
      <SignUpForm />
      <p className="text-muted-foreground text-sm">
        Já tem conta?{' '}
        <Link href="/login" className="text-primary font-medium hover:underline">
          Entrar
        </Link>
      </p>
    </AuthPageShell>
  );
}
