import { requireAdminSession } from '@/app/actions/admin-auth';
import { listWaitlistWithInvites } from '@/app/actions/admin-invites';
import { AdminShell } from '@/components/admin/admin-shell';
import { InviteActions } from '@/components/admin/invite-actions';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin · Interessados',
  robots: { index: false, follow: false },
};

function inviteStatusLabel(person: { inviteToken: string | null; inviteRevoked: boolean }): string {
  if (person.inviteToken) return 'Ativo';
  if (person.inviteRevoked) return 'Revogado';
  return '—';
}

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(iso));
}

export default async function AdminInteressadosPage() {
  await requireAdminSession();
  const people = await listWaitlistWithInvites();

  const withInvite = people.filter((person) => person.inviteToken).length;
  const withCheckin = people.filter((person) => person.selectedSlots.length > 0).length;

  return (
    <AdminShell title="Interessados do alfa">
      <div className="space-y-3">
        <h1 className="font-heading text-foreground text-3xl font-bold md:text-4xl">
          Lista de interessados
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Gere o link pessoal de check-in para cada pessoa. O convite preenche nome e e-mail e
          permite escolher horários.
        </p>
        <p className="text-muted-foreground text-sm">
          {people.length} na lista · {withInvite} com convite ativo · {withCheckin} já responderam
          disponibilidade
        </p>
      </div>

      {people.length === 0 ? (
        <div className="lf-glass rounded-3xl p-8">
          <p className="text-muted-foreground">
            Ainda não há registros em <code className="text-foreground">alpha_waitlist</code>.
          </p>
        </div>
      ) : (
        <div className="lf-glass overflow-x-auto rounded-3xl">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead className="border-border text-muted-foreground border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Pessoa</th>
                <th className="px-4 py-3 font-medium">Entrou em</th>
                <th className="px-4 py-3 font-medium">Convite</th>
                <th className="px-4 py-3 font-medium">Disponibilidade</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.id} className="border-border border-t align-top">
                  <td className="px-4 py-4">
                    <p className="text-foreground font-medium">{person.name || '—'}</p>
                    <p className="text-muted-foreground">{person.email}</p>
                  </td>
                  <td className="text-muted-foreground px-4 py-4 whitespace-nowrap">
                    {formatWhen(person.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      <p className="text-foreground font-medium">{inviteStatusLabel(person)}</p>
                      {person.inviteToken && person.inviteCreatedAt ? (
                        <p className="text-muted-foreground text-xs">
                          {formatWhen(person.inviteCreatedAt)}
                        </p>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {person.selectedSlots.length > 0 ? (
                      <ul className="text-foreground space-y-1 text-xs">
                        {person.selectedSlots.map((slot) => (
                          <li key={slot}>{slot}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">Aguardando</p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <InviteActions person={person} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
