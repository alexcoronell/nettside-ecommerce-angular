import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-copyright',
  imports: [],
  templateUrl: './copyright.html',
  styleUrl: './copyright.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Copyright {
  public currentYear: number = new Date().getFullYear();
}
