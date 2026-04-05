import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminDeleteConfirmStore {
  private readonly showConfirm = signal<boolean>(false);
  private readonly message = signal<string>('');
  private actionCallback: (() => void) | null = null;

  readonly showConfirm$ = this.showConfirm.asReadonly();
  readonly message$ = this.message.asReadonly();

  show(message: string, action: () => void) {
    this.showConfirm.set(true);
    this.message.set(message);
    this.actionCallback = action;
  }

  hide() {
    this.showConfirm.set(false);
    this.message.set('');
    this.actionCallback = null;
  }

  confirm() {
    if (this.actionCallback) {
      this.actionCallback();
    }
    this.hide();
  }
}
