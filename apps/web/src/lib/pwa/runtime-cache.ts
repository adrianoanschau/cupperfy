const STATIC_MEDIA_EXT = /\.(?:png|jpg|jpeg|gif|webp|ico|svg|woff2)$/i;

type RuntimeRequestLike = {
  method: string;
  mode: RequestMode | string;
  headers: Pick<Headers, 'get'>;
};

type RuntimeMatchInput = {
  request: RuntimeRequestLike;
  url: Pick<URL, 'pathname'>;
  sameOrigin: boolean;
};

function isEligibleRuntimeRequest({ request, url, sameOrigin }: RuntimeMatchInput): boolean {
  if (request.method !== 'GET' || !sameOrigin) {
    return false;
  }

  if (request.mode === 'navigate') {
    return false;
  }

  if (url.pathname.startsWith('/api/')) {
    return false;
  }

  return request.headers.get('RSC') !== '1';
}

/** Espelha o SW legado: `/_next/static/*` same-origin, sem HTML/API/RSC. */
export function isNextStaticAsset(input: RuntimeMatchInput): boolean {
  return isEligibleRuntimeRequest(input) && input.url.pathname.startsWith('/_next/static/');
}

/** Espelha o SW legado: `/brand/*` e mídia/fonte por extensão. */
export function isStaticMediaAsset(input: RuntimeMatchInput): boolean {
  if (!isEligibleRuntimeRequest(input)) {
    return false;
  }

  return input.url.pathname.startsWith('/brand/') || STATIC_MEDIA_EXT.test(input.url.pathname);
}
