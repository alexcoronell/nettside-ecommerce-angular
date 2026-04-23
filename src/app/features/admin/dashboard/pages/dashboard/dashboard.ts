import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AdminMenu } from '@shared/components/layouts/admin-menu/admin-menu';

@Component({
  selector: 'app-dashboard',
  imports: [AdminMenu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {}
