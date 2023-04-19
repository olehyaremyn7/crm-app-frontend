import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiEntities } from 'src/app/shared/interfaces/api';

import { Response } from '../../../../shared/interfaces';
import { ErrorService } from '../../../../shared/services/error.service';
import { RetryService } from '../../../../shared/services/retry.service';
import { CategoryId } from '../../categories/interfaces';
import { Position, PositionId, PositionResponse, PositionsResponse } from '../interfaces';

@Injectable()
export class PositionsService {
  private _categoryId: CategoryId;
  private _positionsSubject$ = new BehaviorSubject<Position[]>([]);
  private _isFetchLoading$ = new BehaviorSubject<boolean>(false);
  private _isCreateLoading$ = new BehaviorSubject<boolean>(false);
  private _isDeleteLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private retryService: RetryService, private errorService: ErrorService) {}

  public fetch(): Observable<PositionsResponse> {
    this._isFetchLoading$.next(true);

    return this.http.get<PositionsResponse>(`${ApiEntities.POSITION}/${this._categoryId}`).pipe(
      tap(({ positions }) => {
        this._isFetchLoading$.next(false);
        this.retryService.done();
        this._positionsSubject$.next(positions);
      }),
      catchError((error) => {
        this._isFetchLoading$.next(false);
        this.retryService.retry();
        this._positionsSubject$.next([]);

        return this.errorService.handleError(error);
      }),
    );
  }

  public create(position: Position): Observable<PositionResponse> {
    this._isCreateLoading$.next(true);

    return this.http.post<PositionResponse>(ApiEntities.POSITION, position).pipe(
      tap(({ position }) => {
        const positions = this._positionsSubject$.value;

        positions.unshift(position);

        this._isCreateLoading$.next(false);
        this._positionsSubject$.next(positions);
      }),
      catchError((error) => {
        this._isCreateLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public update(position: Position): Observable<PositionResponse> {
    const { _id } = position;

    this._isCreateLoading$.next(true);

    return this.http.patch<PositionResponse>(`${ApiEntities.POSITION}/${_id}`, position).pipe(
      tap(({ position }) => {
        const positions = this._positionsSubject$.value;
        const positionIndex = positions.findIndex(({ _id: id }) => id === _id);

        positions[positionIndex] = position;

        this._isCreateLoading$.next(false);
        this._positionsSubject$.next(positions);
      }),
      catchError((error) => {
        this._isCreateLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public remove(id: PositionId): Observable<Response> {
    this._isDeleteLoading$.next(true);

    return this.http.delete<Response>(`${ApiEntities.POSITION}/${id}`).pipe(
      tap(() => {
        const positions = this._positionsSubject$.value.filter(({ _id }) => _id !== id);

        this._positionsSubject$.next(positions);
        this._isDeleteLoading$.next(false);
      }),
      catchError((error) => {
        this._isDeleteLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public reset(): void {
    this._positionsSubject$.next([]);
    this._isCreateLoading$.next(false);
    this._isFetchLoading$.next(false);
    this._isDeleteLoading$.next(false);
  }

  public get categoryId(): CategoryId {
    return this._categoryId;
  }

  public set setCategoryId(categoryId: CategoryId) {
    this._categoryId = categoryId;
  }

  public get positions$(): Observable<Position[]> {
    return this._positionsSubject$.asObservable();
  }

  public get orderPositions$(): Observable<Position[]> {
    return this._positionsSubject$.asObservable().pipe(
      map((positions) => {
        return positions.map((position) => ({
          ...position,
          quantity: 1,
        }));
      }),
    );
  }

  public get isFetchLoading(): boolean {
    return this._isFetchLoading$.value;
  }

  public get isCreateLoading(): boolean {
    return this._isCreateLoading$.value;
  }

  public get isDeleteLoading(): boolean {
    return this._isDeleteLoading$.value;
  }
}
