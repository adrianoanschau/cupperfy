import { describe, expect, it } from 'vitest';

import { displayNameFromUser, needsPasswordSetup } from './account';
import { authPageErrorMessage, mapAuthError } from './errors';

describe('needsPasswordSetup', () => {
  it('é true só com a flag do cadastro por e-mail', () => {
    expect(needsPasswordSetup({ user_metadata: { must_set_password: true } } as never)).toBe(true);
    expect(needsPasswordSetup({ user_metadata: {} } as never)).toBe(false);
    expect(needsPasswordSetup(null)).toBe(false);
  });
});

describe('displayNameFromUser', () => {
  it('prefere display_name e cai no e-mail', () => {
    expect(
      displayNameFromUser({
        email: 'ada@cupperfy.test',
        user_metadata: { display_name: 'Ada' },
      } as never),
    ).toBe('Ada');
    expect(displayNameFromUser({ email: 'ada@cupperfy.test', user_metadata: {} } as never)).toBe(
      'ada',
    );
  });
});

describe('mapAuthError', () => {
  it('traduz credenciais inválidas', () => {
    expect(mapAuthError('Invalid login credentials')).toMatch(/e-mail ou senha/i);
  });
});

describe('authPageErrorMessage', () => {
  it('explica falha de sessão no callback', () => {
    expect(authPageErrorMessage('session')).toMatch(/link expirou/i);
  });
});
