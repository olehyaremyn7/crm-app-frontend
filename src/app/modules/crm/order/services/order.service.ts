import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEntities } from 'src/app/shared/interfaces/api';

import { Nullable } from '../../../../shared/interfaces';
import { ErrorService } from '../../../../shared/services/error.service';
import { RetryService } from '../../../../shared/services/retry.service';
import { isObjectEmpty } from '../../../../shared/utils.ts';
import { HISTORY_ORDERS_FETCH_STEP } from '../../history/constants';
import { Filter } from '../../history/interfaces';
import { Order, OrderResponse, OrdersFetchParams, OrdersResponse } from '../interfaces/order';

@Injectable()
export class OrderService {
  private _ordersSubject$ = new BehaviorSubject<Order[]>([]);
  private _isFetchLoading$ = new BehaviorSubject<boolean>(false);
  private _isLoadMoreLoading$ = new BehaviorSubject<boolean>(false);
  private _isCreateLoading$ = new BehaviorSubject<boolean>(false);
  private _limit = HISTORY_ORDERS_FETCH_STEP;
  private _offset = 0;
  private _filter: Nullable<Filter> = null;

  constructor(private http: HttpClient, private retryService: RetryService, private errorService: ErrorService) {}

  public fetch(): Observable<OrdersResponse> {
    const { _offset: offset, _limit: limit } = this;
    const params: OrdersFetchParams = Object.assign({}, this._filter, {
      offset,
      limit,
    });

    this.runFetchLoading();

    return this.http
      .get<OrdersResponse>(ApiEntities.ORDER, {
        params: new HttpParams({
          fromObject: params as any,
        }),
      })
      .pipe(
        tap(({ orders }) => {
          this.stopFetchLoading();
          this.retryService.done();
          this._ordersSubject$.next(orders);
        }),
        catchError((error) => {
          this.stopFetchLoading();
          this.retryService.retry();

          if (!this._ordersSubject$.value.length) {
            this._ordersSubject$.next([]);
          } else {
            error.error.response = 'warning';
            error.error.message = 'An error occurred while trying to load more orders. Try again';
            this._offset -= HISTORY_ORDERS_FETCH_STEP;
          }

          return this.errorService.handleError(error);
        }),
      );
  }

  public create(order: Pick<Order, 'list'>): Observable<OrderResponse> {
    this._isCreateLoading$.next(true);

    return this.http.post<OrderResponse>(ApiEntities.ORDER, order).pipe(
      tap(() => {
        this._isCreateLoading$.next(false);
      }),
      catchError((error) => {
        this._isCreateLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public loadMore(): void {
    this._offset += HISTORY_ORDERS_FETCH_STEP;
    this._isLoadMoreLoading$.next(true);
  }

  public applyFilter(filter: Nullable<Filter>): void {
    this._ordersSubject$.next([]);
    this._offset = 0;
    this._isFetchLoading$.next(true);
    this._filter = filter;
  }

  public reset(): void {
    this._limit = HISTORY_ORDERS_FETCH_STEP;
    this._offset = 0;
    this._filter = null;
    this._ordersSubject$.next([]);
  }

  public get orders$(): Observable<Order[]> {
    return this._ordersSubject$.asObservable();
  }

  public get isFetchLoading(): boolean {
    return this._isFetchLoading$.value;
  }

  public get isLoadMoreLoading(): boolean {
    return this._isLoadMoreLoading$.value;
  }

  public get isCreateLoading(): boolean {
    return this._isCreateLoading$.value;
  }

  public get filter(): Nullable<Filter> {
    return this._filter;
  }

  public get isMoreOrders(): boolean {
    return this._ordersSubject$.value.length < HISTORY_ORDERS_FETCH_STEP;
  }

  public get isFiltered(): boolean {
    return isObjectEmpty(this._filter);
  }

  private runFetchLoading(): void {
    if (!this._isLoadMoreLoading$.value) {
      this._isFetchLoading$.next(true);
    }
  }

  private stopFetchLoading(): void {
    this._isLoadMoreLoading$.next(false);
    this._isFetchLoading$.next(false);
  }
}
