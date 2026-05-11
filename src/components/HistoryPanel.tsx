import { Clock, Trash2 } from 'lucide-react';
import type { Dispatch } from 'react';
import type { Action } from '../state/actions';
import type { HistoryEntry } from '../types/calculator';
import { HistoryEntryRow } from './HistoryEntry';

type Props = {
  history: HistoryEntry[];
  dispatch: Dispatch<Action>;
};

export function HistoryPanel({ history, dispatch }: Props) {
  return (
    <aside className="rounded-lg bg-bg-elevated shadow-2 p-4 flex flex-col h-full min-h-[300px] lg:min-h-[520px]">
      <header className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-fg flex items-center gap-2">
          <Clock size={16} strokeWidth={1.75} />
          Historial
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'CLEAR_HISTORY' })}
            aria-label="borrar historial"
            className="text-fg-muted hover:text-danger transition-colors p-1"
          >
            <Trash2 size={16} strokeWidth={1.75} />
          </button>
        )}
      </header>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-fg-muted">
          <Clock size={32} strokeWidth={1.5} className="mb-2 opacity-50" />
          <p className="text-sm">Sin operaciones todavía</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto -mx-1 px-1">
          {history.map((entry) => (
            <HistoryEntryRow key={entry.id} entry={entry} dispatch={dispatch} />
          ))}
        </div>
      )}
    </aside>
  );
}
