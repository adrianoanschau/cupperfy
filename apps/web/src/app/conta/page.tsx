import Link from 'next/link';

import { AccountShell } from '@/components/account/account-shell';
import { Button } from '@/components/ui/button';
import { requireAccount } from '@/lib/auth/account';
import { COMPETITION_STATUS_LABEL, ENTRY_STATUS_LABEL } from '@/lib/auth/labels';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conta',
};

function competitionName(
  value: { name: string } | { name: string }[] | null | undefined,
): string {
  if (!value) return 'Copa';
  if (Array.isArray(value)) return value[0]?.name ?? 'Copa';
  return value.name;
}

export default async function AccountPage() {
  const { supabase, profile, roles } = await requireAccount();

  const roleLabels = [
    roles.isPlayer ? 'Jogador' : null,
    roles.isOrganizer ? 'Organizador' : null,
  ].filter((label): label is string => Boolean(label));

  const entries =
    roles.isPlayer && roles.playerIds.length > 0
      ? await supabase
          .from('competition_entries')
          .select('id, status, competitions ( name )')
          .in('player_id', roles.playerIds)
          .order('id', { ascending: false })
      : { data: [] as { id: string; status: string; competitions: { name: string } | null }[] };

  const competitions = roles.organizerId
    ? await supabase
        .from('competitions')
        .select('id, name, status')
        .eq('organizer_id', roles.organizerId)
        .order('created_at', { ascending: false })
    : { data: [] as { id: string; name: string; status: string }[] };

  const entryRows = entries.data ?? [];
  const competitionRows = competitions.data ?? [];

  return (
    <AccountShell>
      <section className="flex flex-wrap items-center gap-4">
        {profile.avatarUrl ? (
          // Discord / URL externa — sem otimização do Image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatarUrl}
            alt=""
            className="bg-muted size-14 rounded-full object-cover"
          />
        ) : (
          <span className="bg-muted text-muted-foreground inline-flex size-14 items-center justify-center rounded-full text-lg font-semibold">
            {profile.displayName.slice(0, 1).toUpperCase()}
          </span>
        )}
        <div className="space-y-1">
          <h1 className="font-heading text-foreground text-3xl font-bold">{profile.displayName}</h1>
          <p className="text-muted-foreground text-sm">{roleLabels.join(' · ')}</p>
        </div>
        <Button variant="outline" className="ml-auto" asChild>
          <Link href="/conta/editar">Editar perfil</Link>
        </Button>
      </section>

      {roles.isPlayer ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-heading text-foreground text-xl font-semibold">Minhas inscrições</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/competicoes">Ver copas abertas</Link>
            </Button>
          </div>
          {entryRows.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Você ainda não se inscreveu em nenhuma copa.
            </p>
          ) : (
            <ul className="divide-border border-border divide-y rounded-2xl border">
              {entryRows.map((entry) => (
                <li key={entry.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="text-foreground font-medium">
                    {competitionName(entry.competitions)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {ENTRY_STATUS_LABEL[entry.status] ?? entry.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      {roles.isOrganizer ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-heading text-foreground text-xl font-semibold">Minhas copas</h2>
            <Button size="sm" asChild>
              <Link href="/conta/competicoes/nova">Criar competição</Link>
            </Button>
          </div>
          {competitionRows.length === 0 ? (
            <p className="text-muted-foreground text-sm">Você ainda não criou uma copa.</p>
          ) : (
            <ul className="divide-border border-border divide-y rounded-2xl border">
              {competitionRows.map((competition) => (
                <li
                  key={competition.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="text-foreground font-medium">{competition.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {COMPETITION_STATUS_LABEL[competition.status] ?? competition.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}
    </AccountShell>
  );
}
