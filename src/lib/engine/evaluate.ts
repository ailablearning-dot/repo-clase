import { CalcError } from '../../types/calculator';
import type { Node } from './parse';

const DEG_TO_RAD = Math.PI / 180;

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new CalcError(
      'FACTORIAL_INVALID',
      'Factorial solo para enteros ≥ 0',
    );
  }
  if (n > 170) {
    throw new CalcError('OVERFLOW', 'Resultado fuera de rango');
  }
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export function evaluate(node: Node): number {
  const value = evalNode(node);
  if (!Number.isFinite(value)) {
    throw new CalcError('OVERFLOW', 'Resultado fuera de rango');
  }
  return value;
}

function evalNode(node: Node): number {
  switch (node.type) {
    case 'num':
      return node.value;
    case 'const':
      return node.name === 'PI' ? Math.PI : Math.E;
    case 'unary':
      return -evalNode(node.operand);
    case 'fact':
      return factorial(evalNode(node.operand));
    case 'binary': {
      const left = evalNode(node.left);
      const right = evalNode(node.right);
      switch (node.op) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          if (right === 0) {
            throw new CalcError('DIVISION_BY_ZERO', 'División por cero');
          }
          return left / right;
        case '^':
          return Math.pow(left, right);
      }
      // unreachable
      throw new CalcError('SYNTAX', 'Operador desconocido');
    }
    case 'call': {
      const arg = evalNode(node.arg);
      switch (node.name) {
        case 'sin':
          return Math.sin(arg * DEG_TO_RAD);
        case 'cos':
          return Math.cos(arg * DEG_TO_RAD);
        case 'tan':
          return Math.tan(arg * DEG_TO_RAD);
        case 'log':
          if (arg <= 0) {
            throw new CalcError(
              'LOG_NON_POSITIVE',
              'Logaritmo de cero o negativo',
            );
          }
          return Math.log10(arg);
        case 'ln':
          if (arg <= 0) {
            throw new CalcError(
              'LOG_NON_POSITIVE',
              'Logaritmo de cero o negativo',
            );
          }
          return Math.log(arg);
        case 'sqrt':
          if (arg < 0) {
            throw new CalcError(
              'NEGATIVE_SQRT',
              'Raíz de número negativo',
            );
          }
          return Math.sqrt(arg);
      }
    }
  }
}
