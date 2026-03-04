import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  readonly count: WritableSignal<number> = signal(0);
}
