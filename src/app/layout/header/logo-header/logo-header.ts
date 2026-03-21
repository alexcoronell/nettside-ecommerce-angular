import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-logo-header',
  imports: [NgOptimizedImage],
  templateUrl: './logo-header.html',
  styleUrl: './logo-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoHeader {}
