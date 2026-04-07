import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registration {}
