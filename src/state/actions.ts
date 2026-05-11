import type { FunctionName } from '../types/calculator';

export type Action =
  | { type: 'INPUT_DIGIT'; digit: string }
  | { type: 'INPUT_OPERATOR'; op: '+' | '−' | '×' | '÷' | '^' }
  | { type: 'INPUT_FUNCTION'; name: FunctionName }
  | { type: 'INPUT_CONSTANT'; name: 'π' | 'e' }
  | { type: 'INPUT_PAREN'; paren: '(' | ')' }
  | { type: 'INPUT_FACTORIAL' }
  | { type: 'BACKSPACE' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'CLEAR_ALL' }
  | { type: 'EVALUATE' }
  | { type: 'RECALL_HISTORY'; expression: string }
  | { type: 'CLEAR_HISTORY' };
