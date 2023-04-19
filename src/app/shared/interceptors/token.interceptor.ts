import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthPaths } from 'src/app/modules/authorization/interfaces/routes';
import { AuthorizationService } from 'src/app/modules/authorization/services/authorization.service';

import { LoginQueryParams } from '../../modules/authorization/interfaces';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthorizationService, private router: Router) {}

  public intercept(req: HttpRequest<void>, next: HttpHandler): Observable<HttpEvent<Observable<HttpErrorResponse>>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.token!,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate([AuthPaths.LOGIN], {
            queryParams: {
              [LoginQueryParams.AUTH_FAILED]: true,
            },
          });
        }

        return throwError(() => error);
      }),
    );
  }
}
