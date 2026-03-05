import { Injectable, signal, WritableSignal } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  readonly count: WritableSignal<number> = signal(0);
}
