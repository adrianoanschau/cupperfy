import Image from 'next/image';

import { cn } from '@/lib/utils';

export const CURRENT_MODALITY_LOGOS = [
  {
    id: 'eafc',
    label: 'EA Sports FC',
    src: '/brand/eafc.png',
    width: 261,
    height: 92,
    artwork: 'light' as const,
  },
  {
    id: 'eafc-26',
    label: 'EA Sports FC 26',
    src: '/brand/EAFC26.png',
    width: 500,
    height: 130,
    artwork: 'light' as const,
  },
  {
    id: 'eafc-27',
    label: 'EA Sports FC 27',
    src: '/brand/EAFC27.png',
    width: 404,
    height: 92,
    artwork: 'light' as const,
    scale: 0.8,
  },
  {
    id: 'efootball',
    label: 'eFootball',
    src: '/brand/efootball.png',
    width: 376,
    height: 77,
    artwork: 'dark' as const,
  },
] as const;

export const UPCOMING_VIRTUAL_MODALITIES = [
  {
    id: 'lol',
    label: 'League of Legends',
    src: '/brand/league-of-legends.png',
    width: 554,
    height: 246,
    artwork: 'dark' as const,
    scale: 1.2,
  },
  {
    id: 'valorant',
    label: 'Valorant',
    src: '/brand/valorant.png',
    width: 555,
    height: 120,
    artwork: 'dark' as const,
  },
  {
    id: 'cs2',
    label: 'Counter-Strike',
    src: '/brand/counter-strike.png',
    width: 378,
    height: 68,
    artwork: 'dark' as const,
  },
  {
    id: 'rocket-league',
    label: 'Rocket League',
    src: '/brand/rocket-league.png',
    width: 820,
    height: 285,
    artwork: 'dark' as const,
    scale: 1.2,
  },
] as const;

export const UPCOMING_PHYSICAL_MODALITIES = [
  { id: 'futebol-11', label: 'Futebol 11' },
  { id: 'futebol-7', label: 'Futebol 7' },
  { id: 'futsal', label: 'Futsal' },
  { id: 'volei', label: 'Vôlei' },
  { id: 'basquete', label: 'Basquete' },
  { id: 'handebol', label: 'Handebol' },
  { id: 'tenis', label: 'Tênis' },
  { id: 'tenis-de-mesa', label: 'Tênis de Mesa' },
  { id: 'paddle', label: 'Paddle' },
] as const;

export const VIRTUAL_MODALITIES = [
  ...CURRENT_MODALITY_LOGOS.filter((logo) => logo.id !== 'eafc').map((logo) => ({
    ...logo,
    comingSoon: false as const,
  })),
  ...UPCOMING_VIRTUAL_MODALITIES.map((logo) => ({ ...logo, comingSoon: true as const })),
];

export const PHYSICAL_MODALITIES = UPCOMING_PHYSICAL_MODALITIES.map((logo) => ({
  ...logo,
  comingSoon: true as const,
}));

export const MODALITY_LOGOS = [...VIRTUAL_MODALITIES, ...PHYSICAL_MODALITIES];

const IMAGE_LOGOS = [...CURRENT_MODALITY_LOGOS, ...UPCOMING_VIRTUAL_MODALITIES];

export type ModalityLogoId = (typeof IMAGE_LOGOS)[number]['id'];

function logoFilter(artwork: 'light' | 'dark') {
  return artwork === 'light' ? 'brightness-0 dark:brightness-100' : 'dark:invert';
}

export function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'bg-primary text-primary-foreground font-heading pointer-events-none absolute bottom-[-10px] left-1/2 w-max -translate-x-1/2 rounded-[3px] px-1.5 py-px text-[9px] font-bold tracking-[0.16em] whitespace-nowrap uppercase shadow-sm',
        className,
      )}
    >
      Em breve
    </span>
  );
}

export function ModalityLogoImage({
  id,
  height = 40,
  className,
}: {
  id: ModalityLogoId;
  height?: number;
  className?: string;
}) {
  const logo = IMAGE_LOGOS.find((item) => item.id === id);
  if (!logo) return null;

  const displayHeight = height * ('scale' in logo ? logo.scale : 1);

  return (
    <Image
      src={logo.src}
      alt={logo.label}
      width={logo.width}
      height={logo.height}
      className={cn('w-auto object-contain select-none', logoFilter(logo.artwork), className)}
      style={{ width: 'auto', height: displayHeight }}
    />
  );
}
