export type Operator = '+' | '-' | '*' | '/' | '^';

export type FunctionName = 'log' | 'ln' | 'sin' | 'cos' | 'tan' | 'sqrt';

export type ConstantName = 'PI' | 'E';

export type Token =
  | { type: 'NUMBER'; value: number }
  | { type: 'OP'; op: Operator }
  | { type: 'FUNC'; name: FunctionName }
  | { type: 'CONST'; name: ConstantName }
  | { type: 'FACT' }
  | { type: 'LPAREN' }
  | { type: 'RPAREN' };

export type AngleMode = 'DEG';

export type HistoryEntry = {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
};

export type CalculatorState = {
  expression: string;
  result: string | null;
  error: string | null;
  angleMode: AngleMode;
  history: HistoryEntry[];
};

export type CalcErrorCode =
  | 'DIVISION_BY_ZERO'
  | 'NEGATIVE_SQRT'
  | 'LOG_NON_POSITIVE'
  | 'FACTORIAL_INVALID'
  | 'SYNTAX'
  | 'OVERFLOW';

export class CalcError extends Error {
  code: CalcErrorCode;
  constructor(code: CalcErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'CalcError';
  }
}

export const ERROR_MESSAGES: Record<CalcErrorCode, string> = {
  DIVISION_BY_ZERO: 'División por cero',
  NEGATIVE_SQRT: 'Raíz de número negativo',
  LOG_NON_POSITIVE: 'Logaritmo de cero o negativo',
  FACTORIAL_INVALID: 'Factorial solo para enteros ≥ 0',
  SYNTAX: 'Expresión incompleta',
  OVERFLOW: 'Resultado fuera de rango',
};

export type Theme = 'light' | 'dark';
