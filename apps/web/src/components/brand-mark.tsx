import { cn } from '@/lib/utils';

export const BRAND_ICON_SRC = '/brand/cupperfy-icon.png';

type BrandIconProps = {
  className?: string;
  /** Texto acessível quando o ícone aparece sozinho. Vazio se for decorativo. */
  alt?: string;
};

/** Símbolo da marca (troféu). */
export function BrandIcon({ className, alt = '' }: BrandIconProps) {
  return (
    // img nativo: next/image com 256×235 estourava o hit-area do botão do chat.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND_ICON_SRC}
      alt={alt}
      width={22}
      height={20}
      draggable={false}
      className={cn(
        'pointer-events-none aspect-[256/235] h-[1.15em] w-auto shrink-0 object-contain select-none',
        className,
      )}
    />
  );
}

type BrandMarkProps = {
  className?: string;
  /** Quando false, só o wordmark Oxanium (ex.: no meio de uma frase). */
  withIcon?: boolean;
};

/** Lockup: ícone + wordmark Oxanium `cupper`**fy**. */
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
