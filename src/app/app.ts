import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Signal, signal } from '@angular/core';
import { Header } from './components/header/header';
import { HistoryService, SnippetEntry } from './services/history-service';
import { ResultCard } from './components/result-card/result-card';
import { HistoryPanel } from './components/history-panel/history-panel';
import { CodeEditor, ExplainOptions } from './components/code-editor/code-editor';
import { ClaudeService } from './services/claude-service';

interface ResultEntry extends SnippetEntry {
  options?: ExplainOptions;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, ResultCard, HistoryPanel, CodeEditor],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('AI-Code-Explainer');
  public activeTab: 'explain' | 'history' = 'explain';
  public historyCount!: Signal<number>;
  public isLoading: boolean = false;
  public results: ResultEntry[] = [];

  constructor(
    private readonly historyService: HistoryService,
    private readonly claudeService: ClaudeService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.historyCount = this.historyService.count;
  }

  async onExplainRequested(event: { code: string; options: ExplainOptions }): Promise<void> {
    const { code, options } = event;
    this.isLoading = true;
    try {
      const result = await this.claudeService.explainCode(code).toPromise();
      const entry: ResultEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        code,
        explanation: result?.explanation || '',
        timestamp: Date.now(),
        result,
        options,
      };
      this.results = [entry, ...this.results];
      this.historyService.add(entry);
    } catch (err: any) {
      alert('Error analyzing code: ' + err.message);
    } finally {
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }

  onDismiss(id: string): void {
    this.results = this.results.filter((r) => r.id !== id);
    this.cdr.markForCheck();
  }
}
