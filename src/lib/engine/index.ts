import { tokenize } from './tokenize';
import { parse } from './parse';
import { evaluate } from './evaluate';
import { formatNumber } from './format';

export { tokenize, parse, evaluate, formatNumber };

export function compute(expressionDisplay: string): string {
  const normalized = normalizeForEngine(expressionDisplay);
  const tokens = tokenize(normalized);
  const ast = parse(tokens);
  const value = evaluate(ast);
  return formatNumber(value);
}

export function normalizeForEngine(input: string): string {
  return input
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/√/g, 'sqrt');
}
