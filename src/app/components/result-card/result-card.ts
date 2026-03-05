import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SnippetEntry } from '../../services/history-service';
import { ExplainOptions } from '../code-editor/code-editor';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-result-card',
  imports: [DatePipe],
  templateUrl: './result-card.html',
  styleUrl: './result-card.scss',
})
export class ResultCard {
  @Input() entry!: SnippetEntry;
  @Input() index!: number;
  @Input() options!: ExplainOptions;
  @Output() dismiss = new EventEmitter<string>();

  onDismiss(): void {
    this.dismiss.emit(this.entry.id);
  }
}
