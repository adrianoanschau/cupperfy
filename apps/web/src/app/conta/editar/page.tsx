import Link from 'next/link';

import { AccountShell } from '@/components/account/account-shell';
import { ProfileEditForm } from '@/components/account/profile-edit-form';
import { Button } from '@/components/ui/button';
import { requireAccount } from '@/lib/auth/account';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar perfil',
};

export default async function EditProfilePage() {
  const { profile } = await requireAccount();

  return (
    <AccountShell>
      <div className="max-w-lg space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading text-foreground text-3xl font-bold">Editar perfil</h1>
          <p className="text-muted-foreground text-sm">Nome e foto. O restante do histórico fica na conta.</p>
        </div>
        <ProfileEditForm displayName={profile.displayName} avatarUrl={profile.avatarUrl ?? ''} />
        <Button variant="ghost" asChild>
          <Link href="/conta">Voltar à conta</Link>
        </Button>
      </div>
    </AccountShell>
  );
}
