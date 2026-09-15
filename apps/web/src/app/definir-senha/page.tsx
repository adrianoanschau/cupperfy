import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { SetPasswordForm } from '@/components/auth/set-password-form';
import { requirePasswordSetupUser } from '@/lib/auth/account';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar senha',
};

export default async function SetPasswordPage() {
  await requirePasswordSetupUser();

  return (
    <AuthPageShell
      title="Crie sua senha"
      description="Esse link confirma seu e-mail. Agora defina a senha que você vai usar para entrar."
    >
      <SetPasswordForm />
    </AuthPageShell>
  );
}
