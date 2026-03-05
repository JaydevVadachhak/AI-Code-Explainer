import { Component } from '@angular/core';
import { HistoryService } from '../../services/history-service';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-history-panel',
  imports: [DatePipe, SlicePipe],
  templateUrl: './history-panel.html',
  styleUrl: './history-panel.scss',
})
export class HistoryPanel {
  public history;

  constructor(private readonly historyService: HistoryService) {
    this.history = this.historyService.history;
  }

  onDelete(id: string): void {
    this.historyService.remove(id);
  }

  onClearAll(): void {
    if (confirm('Clear all history?')) {
      this.historyService.clear();
    }
  }
}
