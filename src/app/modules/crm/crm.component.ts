import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AlertService } from '../../shared/services/alert.service';
import { ErrorService } from '../../shared/services/error.service';
import { NotificationService } from '../../shared/services/notification.service';
import { LoginQueryParams } from '../authorization/interfaces';
import { AuthPaths } from '../authorization/interfaces/routes';
import { AuthorizationService } from '../authorization/services/authorization.service';
import { DEFAULT_CRM_DRAWER_LINKS } from './constants/drawer';
import { CrmDrawerLink } from './interfaces/drawer';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
})
export class CrmComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) public drawerRef: MatDrawer;

  private errorSubscription: Subscription;
  public drawerLinks: CrmDrawerLink[] = DEFAULT_CRM_DRAWER_LINKS;
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  constructor(
    private authService: AuthorizationService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private alert: AlertService,
    private notification: NotificationService,
    private errorService: ErrorService,
  ) {}

  public ngOnInit(): void {
    this.errorSubscription = this.errorService.error$.subscribe({
      next: ({ message, type }) => {
        if (type === 'error') {
          this.alert.error(message);
        } else {
          this.notification.message(message);
        }
      },
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate([AuthPaths.LOGIN], {
      queryParams: {
        [LoginQueryParams.LOGOUT]: true,
      },
    });
  }

  public async openCloseDrawerToggle(): Promise<void> {
    await this.drawerRef.toggle();
  }

  public ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }

    this.alert.destroy();
    this.notification.destroy();
  }
}
