import { Display } from './components/Display';
import { HistoryPanel } from './components/HistoryPanel';
import { Keypad } from './components/Keypad';
import { ThemeToggle } from './components/ThemeToggle';
import { useKeyboard } from './hooks/useKeyboard';
import { useTheme } from './hooks/useTheme';
import { CalculatorProvider, useCalculator } from './state/CalculatorContext';

function CalculatorApp() {
  const { state, dispatch } = useCalculator();
  const { theme, toggle } = useTheme();
  useKeyboard(dispatch);

  return (
    <div className="min-h-full bg-bg text-fg">
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-base sm:text-lg font-semibold tracking-tight">
            Calculadora científica
          </h1>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-4 sm:gap-6">
          <section className="flex flex-col gap-4">
            <Display state={state} />
            <Keypad dispatch={dispatch} />
          </section>
          <HistoryPanel history={state.history} dispatch={dispatch} />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CalculatorProvider>
      <CalculatorApp />
    </CalculatorProvider>
  );
}
