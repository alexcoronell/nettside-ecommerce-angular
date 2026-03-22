import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo-header',
  imports: [RouterLink],
  templateUrl: './logo-header.html',
  styleUrl: './logo-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoHeader {}
