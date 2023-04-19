import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class RetryService {
  private _isRetry = new BehaviorSubject<boolean>(false);
  private _onRetry = new Subject<void>();

  public retry(): void {
    this._isRetry.next(true);
  }

  public done(): void {
    this._isRetry.next(false);
  }

  public emit(): void {
    this._onRetry.next();
  }

  public get isRetry(): boolean {
    return this._isRetry.value;
  }

  public get onRetry(): Observable<void> {
    return this._onRetry.asObservable();
  }
}
