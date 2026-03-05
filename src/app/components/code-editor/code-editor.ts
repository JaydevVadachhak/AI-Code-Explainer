import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ExplainOptions {
  wantComplexity: boolean;
  wantDiff: boolean;
}

@Component({
  selector: 'app-code-editor',
  imports: [FormsModule],
  templateUrl: './code-editor.html',
  styleUrl: './code-editor.scss',
})
export class CodeEditor {
  @Input() isLoading: boolean = false;
  @Output() explainRequested = new EventEmitter<{
    code: string;
    options: ExplainOptions;
  }>();
  public placeholder: string = '// Paste your code here...';
  public code: string = '';
  public options: ExplainOptions = {
    wantComplexity: true,
    wantDiff: true,
  };

  clearEditor(): void {
    this.code = '';
  }

  onExplain(): void {
    if (!this.code.trim()) return;
    this.explainRequested.emit({
      code: this.code.trim(),
      options: { ...this.options },
    });
  }
}
