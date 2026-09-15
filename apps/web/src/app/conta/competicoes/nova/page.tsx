import Link from 'next/link';

import { AccountShell } from '@/components/account/account-shell';
import { Button } from '@/components/ui/button';
import { requireAccount } from '@/lib/auth/account';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar competição',
};

export default async function NewCompetitionPage() {
  const { roles } = await requireAccount();

  if (!roles.isOrganizer) {
    return (
      <AccountShell>
        <div className="max-w-lg space-y-4">
          <h1 className="font-heading text-foreground text-3xl font-bold">Criar competição</h1>
          <p className="text-muted-foreground">
            Esta área é para quem tem perfil de organizador. Volte à conta ou complete o onboarding
            como organizador.
          </p>
          <Button asChild>
            <Link href="/conta">Ir para a conta</Link>
          </Button>
        </div>
      </AccountShell>
    );
  }

  return (
    <AccountShell>
      <div className="max-w-lg space-y-4">
        <h1 className="font-heading text-foreground text-3xl font-bold">Criar competição</h1>
        <p className="text-muted-foreground">
          O formulário de criação entra numa próxima etapa. Por enquanto este espaço marca o caminho
          — ainda não dá para abrir uma copa por aqui.
        </p>
        <Button variant="outline" asChild>
          <Link href="/conta">Voltar à conta</Link>
        </Button>
      </div>
    </AccountShell>
  );
}
