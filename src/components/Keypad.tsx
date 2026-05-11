import type { Dispatch } from 'react';
import type { Action } from '../state/actions';
import { CalculatorButton } from './CalculatorButton';

type Props = { dispatch: Dispatch<Action> };

export function Keypad({ dispatch }: Props) {
  const d = dispatch;

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {/* Científicas - fila 1 */}
      <CalculatorButton variant="scientific" onClick={() => d({ type: 'INPUT_FUNCTION', name: 'sin' })}>
        sin
      </CalculatorButton>
      <CalculatorButton variant="scientific" onClick={() => d({ type: 'INPUT_FUNCTION', name: 'cos' })}>
        cos
      </CalculatorButton>
      <CalculatorButton variant="scientific" onClick={() => d({ type: 'INPUT_FUNCTION', name: 'tan' })}>
        tan
      </CalculatorButton>
      <CalculatorButton variant="scientific" onClick={() => d({ type: 'INPUT_FUNCTION', name: 'log' })}>
        log
      </CalculatorButton>

      {/* Científicas - fila 2 */}
      <CalculatorButton variant="scientific" onClick={() => d({ type: 'INPUT_FUNCTION', name: 'ln' })}>
        ln
      </CalculatorButton>
      <CalculatorButton
        variant="scientific"
        onClick={() => d({ type: 'INPUT_FUNCTION', name: 'sqrt' })}
        ariaLabel="raíz cuadrada"
      >
        √
      </CalculatorButton>
      <CalculatorButton
        variant="scientific"
        onClick={() => d({ type: 'INPUT_OPERATOR', op: '^' })}
        ariaLabel="potencia"
      >
        x^y
      </CalculatorButton>
      <CalculatorButton
        variant="scientific"
        onClick={() => d({ type: 'INPUT_FACTORIAL' })}
        ariaLabel="factorial"
      >
        n!
      </CalculatorButton>

      {/* Paréntesis + constantes */}
      <CalculatorButton variant="utility" onClick={() => d({ type: 'INPUT_PAREN', paren: '(' })}>
        (
      </CalculatorButton>
      <CalculatorButton variant="utility" onClick={() => d({ type: 'INPUT_PAREN', paren: ')' })}>
        )
      </CalculatorButton>
      <CalculatorButton
        variant="scientific"
        onClick={() => d({ type: 'INPUT_CONSTANT', name: 'π' })}
        ariaLabel="pi"
      >
        π
      </CalculatorButton>
      <CalculatorButton variant="scientific" onClick={() => d({ type: 'INPUT_CONSTANT', name: 'e' })}>
        e
      </CalculatorButton>

      {/* Utilidades + ÷ */}
      <CalculatorButton variant="utility" onClick={() => d({ type: 'CLEAR_ALL' })} ariaLabel="borrar todo">
        AC
      </CalculatorButton>
      <CalculatorButton variant="utility" onClick={() => d({ type: 'CLEAR_ENTRY' })} ariaLabel="limpiar entrada">
        C
      </CalculatorButton>
      <CalculatorButton variant="utility" onClick={() => d({ type: 'BACKSPACE' })} ariaLabel="retroceso">
        ⌫
      </CalculatorButton>
      <CalculatorButton
        variant="operator"
        onClick={() => d({ type: 'INPUT_OPERATOR', op: '÷' })}
        ariaLabel="dividir"
      >
        ÷
      </CalculatorButton>

      {/* 7 8 9 × */}
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '7' })}>
        7
      </CalculatorButton>
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '8' })}>
        8
      </CalculatorButton>
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '9' })}>
        9
      </CalculatorButton>
      <CalculatorButton
        variant="operator"
        onClick={() => d({ type: 'INPUT_OPERATOR', op: '×' })}
        ariaLabel="multiplicar"
      >
        ×
      </CalculatorButton>

      {/* 4 5 6 − */}
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '4' })}>
        4
      </CalculatorButton>
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '5' })}>
        5
      </CalculatorButton>
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '6' })}>
        6
      </CalculatorButton>
      <CalculatorButton
        variant="operator"
        onClick={() => d({ type: 'INPUT_OPERATOR', op: '−' })}
        ariaLabel="restar"
      >
        −
      </CalculatorButton>

      {/* 1 2 3 + */}
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '1' })}>
        1
      </CalculatorButton>
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '2' })}>
        2
      </CalculatorButton>
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '3' })}>
        3
      </CalculatorButton>
      <CalculatorButton
        variant="operator"
        onClick={() => d({ type: 'INPUT_OPERATOR', op: '+' })}
        ariaLabel="sumar"
      >
        +
      </CalculatorButton>

      {/* 0 (wide) . = */}
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '0' })} wide>
        0
      </CalculatorButton>
      <CalculatorButton variant="digit" onClick={() => d({ type: 'INPUT_DIGIT', digit: '.' })}>
        .
      </CalculatorButton>
      <CalculatorButton variant="equals" onClick={() => d({ type: 'EVALUATE' })} ariaLabel="igual">
        =
      </CalculatorButton>
    </div>
  );
}
