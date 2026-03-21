import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo-header',
  templateUrl: './logo-header.html',
  styleUrl: './logo-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoHeader {}
