import { Component } from '@angular/core';

/* Components */
import { LogoHeader } from './logo-header/logo-header';
import { MenuHeader } from './menu-header/menu-header';
import { ActionsHeader } from './actions-header/actions-header';
import { SearchHeader } from './search-header/search-header';
import { AdminMenu } from '@shared/components/layouts/admin-menu/admin-menu';

@Component({
  selector: 'app-header',
  imports: [LogoHeader, MenuHeader, ActionsHeader, SearchHeader, AdminMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
