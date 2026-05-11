import type { ReactNode } from 'react';

type Variant = 'digit' | 'operator' | 'equals' | 'scientific' | 'utility';

type Props = {
  variant: Variant;
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
  wide?: boolean;
  className?: string;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  digit: 'bg-bg-button text-fg',
  operator: 'bg-bg-button-op text-fg',
  equals: 'bg-accent text-accent-fg hover:brightness-110',
  scientific: 'bg-bg-button-sci text-fg',
  utility: 'bg-bg-button-sci text-fg-muted',
};

export function CalculatorButton({
  variant,
  onClick,
  children,
  ariaLabel,
  wide,
  className = '',
}: Props) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={[
        'rounded-md text-btn font-medium',
        'min-h-[44px]',
        'transition-[transform,filter,background-color] duration-[80ms] ease-out',
        'hover:brightness-105 active:scale-[0.97]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        VARIANT_CLASSES[variant],
        wide ? 'col-span-2' : '',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
