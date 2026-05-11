export function formatNumber(n: number): string {
  if (Number.isNaN(n)) return 'NaN';
  if (!Number.isFinite(n)) return n > 0 ? '∞' : '-∞';
  if (n === 0) return '0';

  const abs = Math.abs(n);

  if (abs >= 1e16 || abs < 1e-9) {
    return n
      .toExponential(6)
      .replace(/\.?0+e/, 'e')
      .replace('e+', 'e');
  }

  if (Number.isInteger(n) && abs < 1e16) {
    return n.toString();
  }

  const fixed = n.toPrecision(12);
  return parseFloat(fixed).toString();
}
