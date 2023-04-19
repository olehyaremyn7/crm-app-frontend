import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Nullable } from 'src/app/shared/interfaces';
import { ApiEntities } from 'src/app/shared/interfaces/api';
import { storage } from 'src/app/shared/utils.ts';

import { ErrorService } from '../../../shared/services/error.service';
import { LoginResponse, StorageKeys, User } from '../interfaces';
import { AuthApiPaths } from '../interfaces/api';
import { parseFromDateTokenExpireIn, parseToDateTokenExpireIn } from '../utils.ts';

@Injectable()
export class AuthorizationService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  public registration(user: User): Observable<User> {
    this._isLoading$.next(true);

    return this.http.post<User>(`${ApiEntities.AUTHORIZATION}${AuthApiPaths.REGISTRATION}`, user).pipe(
      tap(() => {
        this._isLoading$.next(false);
      }),
      catchError((error) => {
        this._isLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public login(user: User): Observable<LoginResponse> {
    this._isLoading$.next(true);

    return this.http.post<LoginResponse>(`${ApiEntities.AUTHORIZATION}${AuthApiPaths.LOGIN}`, user).pipe(
      tap((response) => {
        this.setToken(response);
        this._isLoading$.next(false);
      }),
      catchError((error) => {
        this._isLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public logout(): void {
    this.setToken(null);
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public get user(): Nullable<User> {
    const { USER } = StorageKeys;

    return storage<User>(USER) || null;
  }

  public get isLoading(): boolean {
    return this._isLoading$.value;
  }

  public get token(): Nullable<string> {
    const { TOKEN, TOKEN_EXPIRE_IN } = StorageKeys;
    const tokenExpireIn = storage<string>(TOKEN_EXPIRE_IN) ?? '';
    const token = storage<string>(TOKEN);
    const expiresDate = parseFromDateTokenExpireIn(tokenExpireIn);

    if (new Date() > expiresDate || !token) {
      this.logout();

      return null;
    }

    return token;
  }

  private setToken(response: Nullable<LoginResponse>): void {
    const { TOKEN, TOKEN_EXPIRE_IN, USER } = StorageKeys;

    if (response) {
      const { expiresIn, token, user } = response;
      const expiresDate = parseToDateTokenExpireIn(expiresIn);

      storage(TOKEN, token);
      storage(TOKEN_EXPIRE_IN, expiresDate);
      storage(USER, user);
    } else {
      storage(TOKEN, null, true);
      storage(TOKEN_EXPIRE_IN, null, true);
      storage(USER, null, true);
    }
  }
}
