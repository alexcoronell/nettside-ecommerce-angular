import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LucideDynamicIcon, LucideUser } from '@lucide/angular';

import { AuthStore } from '@core/auth/stores/auth-store';

@Component({
  selector: 'app-actions-header',
  imports: [RouterLink, LucideDynamicIcon],
  templateUrl: './actions-header.html',
  styleUrl: './actions-header.css',
})
export class ActionsHeader {
  private readonly authStore = inject(AuthStore);
  user = computed(() => this.authStore.user());
  lucideUser = LucideUser;

  logout() {
    this.authStore.logout();
  }
}
