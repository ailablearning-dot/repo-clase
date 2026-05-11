import { compute } from '../lib/engine';
import { addEntry, clearHistory } from '../lib/history';
import {
  CalcError,
  ERROR_MESSAGES,
  type CalculatorState,
} from '../types/calculator';
import type { Action } from './actions';

export const initialState: CalculatorState = {
  expression: '',
  result: null,
  error: null,
  angleMode: 'DEG',
  history: [],
};

const FUNCTION_SYMBOL: Record<string, string> = {
  log: 'log(',
  ln: 'ln(',
  sin: 'sin(',
  cos: 'cos(',
  tan: 'tan(',
  sqrt: '√(',
};

const CONSTANT_SYMBOL: Record<string, string> = {
  π: 'π',
  e: 'e',
};

function clearErrorIfNeeded(state: CalculatorState): CalculatorState {
  if (state.error) {
    return { ...state, expression: '', result: null, error: null };
  }
  return state;
}

export function calculatorReducer(
  state: CalculatorState,
  action: Action,
): CalculatorState {
  switch (action.type) {
    case 'INPUT_DIGIT': {
      const base = clearErrorIfNeeded(state);
      const startFresh =
        state.error !== null || (base.result !== null && base.expression === '');
      const expr = startFresh ? '' : base.expression;
      return {
        ...base,
        expression: expr + action.digit,
        result: startFresh ? null : base.result,
      };
    }

    case 'INPUT_OPERATOR': {
      const base = clearErrorIfNeeded(state);
      const seed =
        base.expression === '' && base.result !== null
          ? base.result
          : base.expression;
      if (seed === '') {
        if (action.op === '−') {
          return { ...base, expression: '−' };
        }
        return base;
      }
      const last = seed.slice(-1);
      if ('+−×÷^'.includes(last)) {
        return {
          ...base,
          expression: seed.slice(0, -1) + action.op,
          result: null,
        };
      }
      return { ...base, expression: seed + action.op, result: null };
    }

    case 'INPUT_FUNCTION': {
      const base = clearErrorIfNeeded(state);
      const symbol = FUNCTION_SYMBOL[action.name] ?? `${action.name}(`;
      const seed =
        base.expression === '' && base.result !== null ? '' : base.expression;
      return { ...base, expression: seed + symbol, result: null };
    }

    case 'INPUT_CONSTANT': {
      const base = clearErrorIfNeeded(state);
      const seed =
        base.expression === '' && base.result !== null ? '' : base.expression;
      const symbol = CONSTANT_SYMBOL[action.name] ?? action.name;
      return { ...base, expression: seed + symbol, result: null };
    }

    case 'INPUT_PAREN': {
      const base = clearErrorIfNeeded(state);
      const seed =
        base.expression === '' && base.result !== null
          ? base.result
          : base.expression;
      return { ...base, expression: seed + action.paren, result: null };
    }

    case 'INPUT_FACTORIAL': {
      const base = clearErrorIfNeeded(state);
      const seed =
        base.expression === '' && base.result !== null
          ? base.result
          : base.expression;
      if (seed === '') return base;
      return { ...base, expression: seed + '!', result: null };
    }

    case 'BACKSPACE': {
      if (state.error) {
        return { ...state, expression: '', result: null, error: null };
      }
      if (state.expression === '') return state;
      return { ...state, expression: state.expression.slice(0, -1) };
    }

    case 'CLEAR_ENTRY':
      return { ...state, expression: '', error: null };

    case 'CLEAR_ALL':
      return { ...state, expression: '', result: null, error: null };

    case 'EVALUATE': {
      if (state.expression === '') return state;
      try {
        const result = compute(state.expression);
        const history = addEntry(state.history, state.expression, result);
        return {
          ...state,
          expression: '',
          result,
          error: null,
          history,
        };
      } catch (err) {
        const message =
          err instanceof CalcError
            ? ERROR_MESSAGES[err.code]
            : 'Expresión incompleta';
        return { ...state, error: message, result: null };
      }
    }

    case 'RECALL_HISTORY':
      return {
        ...state,
        expression: action.expression,
        result: null,
        error: null,
      };

    case 'CLEAR_HISTORY':
      return { ...state, history: clearHistory() };
  }
}
