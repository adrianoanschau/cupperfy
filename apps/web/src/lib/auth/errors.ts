export function mapAuthError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('already registered') || normalized.includes('user already exists')) {
    return 'Este e-mail já está cadastrado.';
  }

  if (normalized.includes('invalid login') || normalized.includes('invalid credentials')) {
    return 'E-mail ou senha incorretos.';
  }

  if (normalized.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar.';
  }

  if (normalized.includes('password')) {
    return 'A senha precisa ter pelo menos 6 caracteres.';
  }

  if (normalized.includes('rate limit') || normalized.includes('too many')) {
    return 'Muitas tentativas. Espere um pouco e tente de novo.';
  }

  if (
    normalized.includes('provider is not enabled') ||
    normalized.includes('unsupported provider')
  ) {
    return 'O acesso com Discord ainda não está configurado.';
  }

  return 'Não foi possível concluir agora. Tente de novo em instantes.';
}

export function authPageErrorMessage(code: string | undefined): string | null {
  if (!code) return null;
  if (code === 'oauth_cancelado') return 'Você cancelou o acesso com Discord.';
  if (code === 'oauth') return 'Não foi possível entrar com Discord. Tente de novo.';
  if (code === 'session') return 'Sessão inválida. Entre de novo.';
  return 'Não foi possível entrar. Tente de novo.';
}
