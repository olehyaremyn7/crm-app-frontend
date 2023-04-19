import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthorizationService } from 'src/app/modules/authorization/services/authorization.service';
import { CrmPaths } from 'src/app/modules/crm/interfaces/routes';

@Injectable()
export class AuthorizationGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthorizationService, private router: Router) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      return of(true).pipe(
        tap(() => {
          this.authService.logout();
        }),
      );
    } else {
      return of(false).pipe(
        tap(() => {
          this.router.navigate([CrmPaths.OVERVIEW]);
        }),
      );
    }
  }

  public canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
