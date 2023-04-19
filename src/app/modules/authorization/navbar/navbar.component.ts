import { Component } from '@angular/core';

import { DEFAULT_AUTH_TABS } from '../constants/navbar';
import { AuthTab } from '../interfaces/navbar';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public authTabs: AuthTab[] = DEFAULT_AUTH_TABS;

  constructor(public authService: AuthorizationService) {}
}
