import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEntities } from 'src/app/shared/interfaces/api';

import { Nullable } from '../../../../shared/interfaces';
import { ErrorService } from '../../../../shared/services/error.service';
import { RetryService } from '../../../../shared/services/retry.service';
import { OverviewData, OverviewResponse } from '../../overview/interfaces';
import { AnalyticsCharts, AnalyticsResponse } from '../interfaces';
import { AnalyticsApiPaths } from '../interfaces/api';

@Injectable()
export class AnalyticsService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _overview: OverviewData[] = [];
  private _overviewDate: Nullable<Date> = null;
  private _charts: Nullable<AnalyticsCharts> = null;
  private _average: Nullable<number> = null;

  constructor(private http: HttpClient, private retryService: RetryService, private errorService: ErrorService) {}

  public fetch(): Observable<AnalyticsResponse> {
    this._isLoading$.next(true);

    return this.http.get<AnalyticsResponse>(ApiEntities.ANALYTICS).pipe(
      tap(({ average, charts }) => {
        this._isLoading$.next(false);
        this.retryService.done();
        this._charts = charts;
        this._average = average;
      }),
      catchError((error) => {
        this._isLoading$.next(false);
        this.retryService.retry();
        this._charts = null;
        this._average = null;

        return this.errorService.handleError(error);
      }),
    );
  }

  public getOverview(): Observable<OverviewResponse> {
    this._isLoading$.next(true);

    return this.http.get<OverviewResponse>(`${ApiEntities.ANALYTICS}${AnalyticsApiPaths.OVERVIEW}`).pipe(
      tap(({ date, overview }) => {
        this._isLoading$.next(false);
        this.retryService.done();
        this._overview = overview;
        this._overviewDate = date;
      }),
      catchError((error) => {
        this._isLoading$.next(false);
        this.retryService.retry();
        this._overview = [];
        this._overviewDate = null;

        return this.errorService.handleError(error);
      }),
    );
  }

  public reset(): void {
    this._isLoading$.next(false);
    this._overviewDate = null;
    this._overview = [];
    this._average = null;
    this._charts = null;
  }

  public get overview(): OverviewData[] {
    return this._overview;
  }

  public get overviewDate(): Nullable<Date> {
    return this._overviewDate;
  }

  public get charts(): Nullable<AnalyticsCharts> {
    return this._charts;
  }

  public get average(): Nullable<number> {
    return this._average;
  }

  public get isLoading(): boolean {
    return this._isLoading$.value;
  }
}
