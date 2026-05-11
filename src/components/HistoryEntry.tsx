import type { Dispatch } from 'react';
import type { Action } from '../state/actions';
import type { HistoryEntry as Entry } from '../types/calculator';

type Props = {
  entry: Entry;
  dispatch: Dispatch<Action>;
};

function relativeTime(ts: number, now: number = Date.now()): string {
  const diff = Math.max(0, Math.floor((now - ts) / 1000));
  if (diff < 60) return 'hace unos segundos';
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
  return `hace ${Math.floor(diff / 86400)} d`;
}

export function HistoryEntryRow({ entry, dispatch }: Props) {
  return (
    <button
      type="button"
      onClick={() =>
        dispatch({ type: 'RECALL_HISTORY', expression: entry.expression })
      }
      className="w-full text-left py-3 px-1 border-b border-border last:border-b-0 hover:bg-bg-button transition-colors rounded-sm"
    >
      <div className="font-mono text-sm text-fg-muted tabular break-all">
        {entry.expression}
      </div>
      <div className="font-mono text-base text-fg tabular text-right break-all">
        = {entry.result}
      </div>
      <div className="text-xs text-fg-muted mt-1">
        {relativeTime(entry.timestamp)}
      </div>
    </button>
  );
}
