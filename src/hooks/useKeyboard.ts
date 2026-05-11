import { useEffect } from 'react';
import type { Dispatch } from 'react';
import type { Action } from '../state/actions';

const DIGIT_KEYS = new Set([
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
]);

export function useKeyboard(dispatch: Dispatch<Action>) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // No interceptar atajos con modificadores
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key;

      if (DIGIT_KEYS.has(key)) {
        dispatch({ type: 'INPUT_DIGIT', digit: key });
        e.preventDefault();
        return;
      }

      if (key === '+') {
        dispatch({ type: 'INPUT_OPERATOR', op: '+' });
        e.preventDefault();
        return;
      }
      if (key === '-') {
        dispatch({ type: 'INPUT_OPERATOR', op: '−' });
        e.preventDefault();
        return;
      }
      if (key === '*') {
        dispatch({ type: 'INPUT_OPERATOR', op: '×' });
        e.preventDefault();
        return;
      }
      if (key === '/') {
        dispatch({ type: 'INPUT_OPERATOR', op: '÷' });
        e.preventDefault();
        return;
      }
      if (key === '^') {
        dispatch({ type: 'INPUT_OPERATOR', op: '^' });
        e.preventDefault();
        return;
      }
      if (key === '(' || key === ')') {
        dispatch({ type: 'INPUT_PAREN', paren: key });
        e.preventDefault();
        return;
      }
      if (key === '!') {
        dispatch({ type: 'INPUT_FACTORIAL' });
        e.preventDefault();
        return;
      }
      if (key === 'Enter' || key === '=') {
        dispatch({ type: 'EVALUATE' });
        e.preventDefault();
        return;
      }
      if (key === 'Backspace') {
        dispatch({ type: 'BACKSPACE' });
        e.preventDefault();
        return;
      }
      if (key === 'Escape') {
        dispatch({ type: 'CLEAR_ALL' });
        e.preventDefault();
        return;
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dispatch]);
}
