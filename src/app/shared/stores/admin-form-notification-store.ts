import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminFormNotificationStore {
  private readonly showNotification = signal<boolean>(false);
  private readonly message = signal<string>('');
  private readonly type = signal<'success' | 'error'>('success');

  readonly showNotification$ = this.showNotification.asReadonly();
  readonly message$ = this.message.asReadonly();
  readonly type$ = this.type.asReadonly();

  show(message: string, type: 'success' | 'error') {
    this.showNotification.set(true);
    this.message.set(message);
    this.type.set(type);
  }

  hide() {
    this.showNotification.set(false);
    this.message.set('');
    this.type.set('success');
  }
}
