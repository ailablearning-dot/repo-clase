import type { HistoryEntry } from '../types/calculator';

const HISTORY_KEY = 'calc.history.v1';
const MAX_ENTRIES = 100;

function safeLocalStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    const test = '__calc_probe__';
    window.localStorage.setItem(test, '1');
    window.localStorage.removeItem(test);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadHistory(): HistoryEntry[] {
  const ls = safeLocalStorage();
  if (!ls) return [];
  const raw = ls.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidEntry);
  } catch {
    return [];
  }
}

export function saveHistory(history: HistoryEntry[]): void {
  const ls = safeLocalStorage();
  if (!ls) return;
  try {
    ls.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    /* quota or other error: silently degrade */
  }
}

export function addEntry(
  history: HistoryEntry[],
  expression: string,
  result: string,
): HistoryEntry[] {
  const entry: HistoryEntry = {
    id: cryptoRandomId(),
    expression,
    result,
    timestamp: Date.now(),
  };
  const next = [entry, ...history].slice(0, MAX_ENTRIES);
  saveHistory(next);
  return next;
}

export function clearHistory(): HistoryEntry[] {
  const ls = safeLocalStorage();
  if (ls) {
    try {
      ls.removeItem(HISTORY_KEY);
    } catch {
      /* noop */
    }
  }
  return [];
}

function isValidEntry(x: unknown): x is HistoryEntry {
  if (!x || typeof x !== 'object') return false;
  const e = x as Record<string, unknown>;
  return (
    typeof e.id === 'string' &&
    typeof e.expression === 'string' &&
    typeof e.result === 'string' &&
    typeof e.timestamp === 'number'
  );
}

function cryptoRandomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
