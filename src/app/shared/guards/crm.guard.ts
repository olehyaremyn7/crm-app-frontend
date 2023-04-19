import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthPaths } from 'src/app/modules/authorization/interfaces/routes';
import { AuthorizationService } from 'src/app/modules/authorization/services/authorization.service';

import { LoginQueryParams } from '../../modules/authorization/interfaces';

@Injectable()
export class CrmGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthorizationService, private router: Router) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return of(true);
    } else {
      return of(false).pipe(
        tap(() => {
          this.authService.logout();
          this.router.navigate([AuthPaths.LOGIN], {
            queryParams: {
              [LoginQueryParams.NOT_LOGIN]: true,
            },
          });
        }),
      );
    }
  }

  public canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
