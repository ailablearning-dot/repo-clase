import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import { loadHistory } from '../lib/history';
import type { CalculatorState } from '../types/calculator';
import type { Action } from './actions';
import {
  calculatorReducer,
  initialState as baseInitialState,
} from './calculatorReducer';

type ContextValue = {
  state: CalculatorState;
  dispatch: Dispatch<Action>;
};

const CalculatorContext = createContext<ContextValue | null>(null);

function init(): CalculatorState {
  return { ...baseInitialState, history: loadHistory() };
}

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(calculatorReducer, undefined, init);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx) {
    throw new Error('useCalculator debe usarse dentro de CalculatorProvider');
  }
  return ctx;
}
