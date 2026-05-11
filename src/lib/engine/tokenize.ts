import {
  CalcError,
  type FunctionName,
  type Token,
} from '../../types/calculator';

const FUNCTIONS: readonly FunctionName[] = [
  'log',
  'ln',
  'sin',
  'cos',
  'tan',
  'sqrt',
];

const isDigit = (ch: string) => ch >= '0' && ch <= '9';
const isLetter = (ch: string) => /[a-zA-Z]/.test(ch);

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (ch === ' ' || ch === '\t') {
      i++;
      continue;
    }

    if (isDigit(ch) || ch === '.') {
      let start = i;
      while (i < input.length && (isDigit(input[i]) || input[i] === '.')) {
        i++;
      }
      const numStr = input.slice(start, i);
      const value = Number(numStr);
      if (!Number.isFinite(value) || numStr.split('.').length > 2) {
        throw new CalcError('SYNTAX', `Número inválido: ${numStr}`);
      }
      tokens.push({ type: 'NUMBER', value });
      continue;
    }

    if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '^') {
      tokens.push({ type: 'OP', op: ch });
      i++;
      continue;
    }

    if (ch === '(') {
      tokens.push({ type: 'LPAREN' });
      i++;
      continue;
    }
    if (ch === ')') {
      tokens.push({ type: 'RPAREN' });
      i++;
      continue;
    }
    if (ch === '!') {
      tokens.push({ type: 'FACT' });
      i++;
      continue;
    }
    if (ch === 'π') {
      tokens.push({ type: 'CONST', name: 'PI' });
      i++;
      continue;
    }

    if (isLetter(ch)) {
      let start = i;
      while (i < input.length && isLetter(input[i])) {
        i++;
      }
      const word = input.slice(start, i);

      if (word === 'pi' || word === 'PI') {
        tokens.push({ type: 'CONST', name: 'PI' });
        continue;
      }
      if (word === 'e' || word === 'E') {
        tokens.push({ type: 'CONST', name: 'E' });
        continue;
      }
      if ((FUNCTIONS as readonly string[]).includes(word)) {
        tokens.push({ type: 'FUNC', name: word as FunctionName });
        continue;
      }
      throw new CalcError('SYNTAX', `Símbolo desconocido: ${word}`);
    }

    throw new CalcError('SYNTAX', `Carácter inválido: ${ch}`);
  }

  return tokens;
}
