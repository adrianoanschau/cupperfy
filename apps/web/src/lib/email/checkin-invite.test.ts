import { describe, expect, it } from 'vitest';

import { FOUNDER_NAME } from '@/lib/site-config';

import { buildCheckinInviteEmail } from './checkin-invite';

describe('buildCheckinInviteEmail', () => {
  it('monta convite pessoal da Copa EA FC em um único dia', () => {
    const email = buildCheckinInviteEmail({
      name: 'Ana',
      checkinUrl: 'https://cupperfy.com/checkin/token-teste',
    });

    expect(email.subject).toMatch(/EA FC/);
    expect(email.text).toContain('Olá, Ana!');
    expect(email.text).toMatch(/único dia/);
    expect(email.text).toContain(FOUNDER_NAME);
    expect(email.html).toContain('https://cupperfy.com/checkin/token-teste');
  });
});
