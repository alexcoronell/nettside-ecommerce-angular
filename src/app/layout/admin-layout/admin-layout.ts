import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminFormNotification } from '@shared/components/ui/admin-form-notification/admin-form-notification';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminFormNotification],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
