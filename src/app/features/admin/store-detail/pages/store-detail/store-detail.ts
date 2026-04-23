import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-store-detail',
  imports: [],
  templateUrl: './store-detail.html',
  styleUrl: './store-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreDetail {}
