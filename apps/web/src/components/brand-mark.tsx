import Image from 'next/image';

import { cn } from '@/lib/utils';

export const BRAND_ICON_SRC = '/brand/cupperfy-icon.png';
export const BRAND_ICON_WHITE_SRC = '/brand/cupperfy-icon-white.png';
export const BRAND_LOCKUP_SRC = '/brand/cupperfy-lockup.png';
export const BRAND_LOCKUP_LIGHT_SRC = '/brand/cupperfy-lockup-light.png';

const LOCKUP_SIZE = { width: 1031, height: 241 } as const;

type BrandIconProps = {
  className?: string;
  /** Texto acessível quando o ícone aparece sozinho. Vazio se for decorativo. */
  alt?: string;
  /** `white` para CTAs laranja (ex.: botão de dúvidas). */
  tone?: 'brand' | 'white';
};

/** Símbolo da marca (troféu). */
export function BrandIcon({ className, alt = '', tone = 'brand' }: BrandIconProps) {
  return (
    // img nativo: next/image com o PNG cheio estourava o hit-area do botão do chat.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tone === 'white' ? BRAND_ICON_WHITE_SRC : BRAND_ICON_SRC}
      alt={alt}
      width={314}
      height={287}
      draggable={false}
      className={cn(
        'pointer-events-none h-[1.15em] w-auto shrink-0 object-contain select-none',
        className,
      )}
    />
  );
}

type BrandLockupProps = {
  className?: string;
  alt?: string;
  /** Versão com wordmark escuro, para fundos claros. */
  onLight?: boolean;
  priority?: boolean;
};

/** Lockup horizontal extraído de `design/logo-base.png`. */
export function BrandLockup({
  className,
  alt = 'Cupperfy',
  onLight = false,
  priority = false,
}: BrandLockupProps) {
  return (
    <Image
      src={onLight ? BRAND_LOCKUP_LIGHT_SRC : BRAND_LOCKUP_SRC}
      alt={alt}
      width={LOCKUP_SIZE.width}
      height={LOCKUP_SIZE.height}
      priority={priority}
      draggable={false}
      className={cn('h-8 w-auto object-contain object-left select-none', className)}
    />
  );
}

type BrandMarkProps = {
  className?: string;
  /** Quando false, só o wordmark Oxanium (ex.: no meio de uma frase). */
  withIcon?: boolean;
};

/** Ícone + wordmark Oxanium `cupper`**fy** — adapta ao tema. */
export function BrandMark({ className, withIcon = true }: BrandMarkProps) {
  return (
    <span
      className={cn(
        'font-heading inline-flex items-center gap-2 font-bold tracking-tight',
        className,
      )}
    >
      {withIcon ? <BrandIcon /> : null}
      <span>
        cupper<span className="text-primary">fy</span>
      </span>
    </span>
  );
}
