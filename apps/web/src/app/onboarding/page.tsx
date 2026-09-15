import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { OnboardingForm } from '@/components/onboarding/onboarding-form';
import { requireOnboardingUser } from '@/lib/auth/account';
import { FOOTBALL_ESPORTS_SLUG } from '@/lib/auth/labels';
import { createSupabaseAnonClient } from '@/lib/supabase/server';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Onboarding',
};

export default async function OnboardingPage() {
  await requireOnboardingUser();
  const supabase = createSupabaseAnonClient();
  const { data: sports } = await supabase
    .from('sports')
    .select('id, name, slug')
    .eq('slug', FOOTBALL_ESPORTS_SLUG);

  return (
    <AuthPageShell
      title="Como você entra na Cupperfy?"
      description="Escolha um papel ou os dois. Dá para ajustar depois, mas o histórico começa agora."
    >
      <OnboardingForm sports={sports ?? []} />
    </AuthPageShell>
  );
}
