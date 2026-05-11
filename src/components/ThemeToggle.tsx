import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../types/calculator';

type Props = {
  theme: Theme;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className="w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-fg hover:brightness-110 transition-all"
    >
      {isDark ? <Sun size={20} strokeWidth={1.75} /> : <Moon size={20} strokeWidth={1.75} />}
    </button>
  );
}
