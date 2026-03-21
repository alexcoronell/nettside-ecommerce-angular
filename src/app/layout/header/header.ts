import { Component } from '@angular/core';

/* Components */
import { LogoHeader } from './logo-header/logo-header';
import { MenuHeader } from './menu-header/menu-header';
import { ActionsHeader } from './actions-header/actions-header';

@Component({
  selector: 'app-header',
  imports: [LogoHeader, MenuHeader, ActionsHeader],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
