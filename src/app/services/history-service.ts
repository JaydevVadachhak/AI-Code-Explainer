import { computed, Injectable, signal } from '@angular/core';

export interface SnippetEntry {
  id: string;
  code: string;
  explanation: string;
  timestamp: number;
  result?: ExplanationResult;
}

export interface ExplanationResult {
  explanation: string;
  keyPoints: string[];
  timeComplexity?: ComplexityInfo;
  spaceComplexity?: ComplexityInfo;
  optimizedCode?: string;
  optimizationNotes?: string;
  potentialIssues?: string | null;
}

export interface ComplexityInfo {
  notation: string;
  description: string;
}

const STORAGE_KEY = 'codelens-history';
const MAX_HISTORY = 20;

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly _history = signal<SnippetEntry[]>(this.loadFromStorage());
  readonly history = this._history.asReadonly();
  readonly count = computed(() => this._history().length);

  add(entry: SnippetEntry): void {
    this._history.update((h) => {
      const updated = [entry, ...h].slice(0, MAX_HISTORY);
      this.saveToStorage(updated);
      return updated;
    });
  }

  remove(id: string): void {
    this._history.update((h) => {
      const updated = h.filter((e) => e.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }

  clear(): void {
    this._history.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadFromStorage(): SnippetEntry[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private saveToStorage(history: SnippetEntry[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}
