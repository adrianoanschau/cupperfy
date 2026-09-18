import { describe, expect, it } from 'vitest';

import { originFromHost, originFromRequest, resolveRequestHost } from './app-origin';

describe('resolveRequestHost', () => {
  it('mantém cupperfy.localhost quando o Next encaminha localhost', () => {
    expect(resolveRequestHost('cupperfy.localhost', 'localhost')).toBe('cupperfy.localhost');
    expect(resolveRequestHost('cupperfy.localhost:80', 'localhost')).toBe('cupperfy.localhost:80');
  });

  it('usa o forwarded host em produção', () => {
    expect(resolveRequestHost('localhost:3000', 'cupperfy.com')).toBe('cupperfy.com');
  });
});

describe('originFromHost', () => {
  it('usa http em hosts locais', () => {
    expect(originFromHost('cupperfy.localhost', null)).toBe('http://cupperfy.localhost');
    expect(originFromHost('localhost', null)).toBe('http://localhost');
  });
});

describe('originFromRequest', () => {
  it('não redireciona o callback para localhost', () => {
    const request = new Request('http://localhost/auth/callback', {
      headers: {
        host: 'cupperfy.localhost',
        'x-forwarded-host': 'localhost',
      },
    });
    expect(originFromRequest(request)).toBe('http://cupperfy.localhost');
  });
});
