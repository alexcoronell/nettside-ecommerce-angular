import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@shared/components/layouts/header/header';
import { Footer } from '@shared/components/layouts/footer/footer';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
