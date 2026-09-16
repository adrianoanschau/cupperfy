import { describe, expect, it } from 'vitest';

import { findCannedAnswer } from './canned-faq';

const contacts = {
  whatsappUrl: 'https://wa.me/test',
  telegramUrl: 'https://t.me/test',
  youtubeUrl: 'https://www.youtube.com/@Cupperfy',
  instagramUrl: 'https://www.instagram.com/cupperfy',
  email: 'contato@cupperfy.com',
};

describe('findCannedAnswer', () => {
  it('explica o cadastro na lista e o convite pessoal', () => {
    const answer = findCannedAnswer('Como entro na lista de interesse?', contacts);

    expect(answer).toMatch(/lista de interesse/i);
    expect(answer).toMatch(/convite pessoal/i);
    expect(answer).not.toMatch(/sábado/i);
  });

  it('diz que o primeiro campeonato é EA FC, um de cada vez', () => {
    const answer = findCannedAnswer('Quais jogos entram na temporada 0?', contacts);

    expect(answer).toMatch(/EA FC/);
    expect(answer).toMatch(/um de cada vez/);
  });
});
