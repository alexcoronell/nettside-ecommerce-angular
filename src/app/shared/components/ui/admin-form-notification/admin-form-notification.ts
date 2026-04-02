import { Component, inject, computed } from '@angular/core';
import { AdminFormNotificationStore } from '@shared/stores/admin-form-notification-store';

@Component({
  selector: 'app-admin-form-notification',
  imports: [],
  templateUrl: './admin-form-notification.html',
  styleUrl: './admin-form-notification.css',
})
export class AdminFormNotification {
  private readonly adminFormNotificationStore = inject(AdminFormNotificationStore);

  readonly showNotification = computed(() => this.adminFormNotificationStore.showNotification$());
  readonly message = computed(() => this.adminFormNotificationStore.message$());
  readonly type = computed(() => this.adminFormNotificationStore.type$());

  hide() {
    this.adminFormNotificationStore.hide();
  }
}
