import type { CalculatorState } from '../types/calculator';

type Props = {
  state: CalculatorState;
};

export function Display({ state }: Props) {
  const { expression, result, error, angleMode } = state;

  return (
    <div
      className="rounded-lg bg-bg-elevated shadow-2 p-5 sm:p-6 flex flex-col min-h-[140px] sm:min-h-[160px]"
      role="status"
      aria-live="polite"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs uppercase tracking-wider text-fg-muted">
          {angleMode}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-end items-end gap-1 mt-2">
        <div className="font-mono text-expr text-fg-muted tabular break-all text-right min-h-[28px]">
          {expression || ' '}
        </div>
        <div
          className={[
            'font-mono text-result tabular break-all text-right',
            error ? 'text-danger' : 'text-fg',
          ].join(' ')}
        >
          {error ? error : (result ?? '0')}
        </div>
      </div>
    </div>
  );
}
