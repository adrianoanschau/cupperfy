'use server';

import { revalidatePath } from 'next/cache';

import { createSupabaseUserClient } from '@/lib/supabase/server';

export type UpdateProfileResult = { ok: true } | { ok: false; error: string };

export async function updateBasicProfile(input: {
  displayName: string;
  avatarUrl: string;
}): Promise<UpdateProfileResult> {
  const displayName = input.displayName.trim();
  const avatarUrl = input.avatarUrl.trim();

  if (displayName.length < 1 || displayName.length > 80) {
    return { ok: false, error: 'O nome precisa ter entre 1 e 80 caracteres.' };
  }

  const supabase = await createSupabaseUserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: 'Entre de novo para salvar o perfil.' };
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: displayName,
      avatar_url: avatarUrl.length > 0 ? avatarUrl : null,
    })
    .eq('user_id', user.id);

  if (error) {
    console.error('profiles update', error);
    return { ok: false, error: 'Não foi possível salvar o perfil.' };
  }

  revalidatePath('/conta');
  revalidatePath('/conta/editar');
  return { ok: true };
}
