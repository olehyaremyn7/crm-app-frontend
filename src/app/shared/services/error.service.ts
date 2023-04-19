import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';

import { Error } from '../interfaces';

@Injectable()
export class ErrorService {
  private _errorSubject$ = new Subject<Error>();

  public get error$(): Observable<Error> {
    return this._errorSubject$.asObservable();
  }

  public handleError(errorResponse: HttpErrorResponse): Observable<never> {
    const {
      error: { message, response: type },
    } = errorResponse;

    this._errorSubject$.next({
      message,
      type,
    });

    return throwError(() => errorResponse);
  }
}
