import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Header } from './components/header/header';
import { HistoryService } from './services/history-service';
import { ResultCard } from './components/result-card/result-card';
import { HistoryPanel } from './components/history-panel/history-panel';
import { CodeEditor } from './components/code-editor/code-editor';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, ResultCard, HistoryPanel, CodeEditor],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('AI-Code-Explainer');
  public activeTab: 'explain' | 'history' = 'explain';
  public historyCount!: WritableSignal<number>;
  public isLoading: boolean = false;

  constructor(private readonly historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyCount = this.historyService.count;
  }

  onExplainRequested(event: { code: string; options: any }): void {
    this.isLoading = true;
  }
}
