export type BrandSocialLinks = {
  youtubeUrl: string;
  instagramUrl: string;
};

/** Redes oficiais da marca (públicas). */
export function getBrandSocialLinks(): BrandSocialLinks {
  return {
    youtubeUrl:
      process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || 'https://www.youtube.com/@Cupperfy',
    instagramUrl:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() ||
      'https://www.instagram.com/cupperfy',
  };
}
