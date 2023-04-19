import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiEntities } from 'src/app/shared/interfaces/api';

import { Nullable, Response } from '../../../../shared/interfaces';
import { ErrorService } from '../../../../shared/services/error.service';
import { RetryService } from '../../../../shared/services/retry.service';
import { CategoriesResponse, Category, CategoryId, CategoryResponse } from '../interfaces';

@Injectable()
export class CategoriesService {
  private _categoriesSubject$ = new BehaviorSubject<Category[]>([]);
  private _isFetchLoading$ = new BehaviorSubject<boolean>(false);
  private _isCreateLoading$ = new BehaviorSubject<boolean>(false);
  private _isDeleteLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private retryService: RetryService, private errorService: ErrorService) {}

  public fetch(): Observable<CategoriesResponse> {
    this._isFetchLoading$.next(true);

    return this.http.get<CategoriesResponse>(ApiEntities.CATEGORY).pipe(
      tap(({ categories }) => {
        this._isFetchLoading$.next(false);
        this.retryService.done();
        this._categoriesSubject$.next(categories);
      }),
      catchError((error) => {
        this._isFetchLoading$.next(false);
        this.retryService.retry();
        this._categoriesSubject$.next([]);

        return this.errorService.handleError(error);
      }),
    );
  }

  public create(name: string, categoryImage: Nullable<File>): Observable<CategoryResponse> {
    this._isCreateLoading$.next(true);

    const fordData = this.createFormData(name, categoryImage);

    return this.http.post<CategoryResponse>(ApiEntities.CATEGORY, fordData).pipe(
      tap(({ category }) => {
        const categories = this._categoriesSubject$.value;

        categories.unshift(category);

        this._isCreateLoading$.next(false);
        this._categoriesSubject$.next(categories);
      }),
      catchError((error) => {
        this._isCreateLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public update(id: CategoryId, name: string, categoryImage: Nullable<File>): Observable<CategoryResponse> {
    this._isCreateLoading$.next(true);

    const fordData = this.createFormData(name, categoryImage);

    return this.http.patch<CategoryResponse>(`${ApiEntities.CATEGORY}/${id}`, fordData).pipe(
      tap(({ category }) => {
        const categories = this._categoriesSubject$.value;
        const categoryIndex = categories.findIndex(({ _id }) => _id === id);

        categories[categoryIndex] = category;

        this._isCreateLoading$.next(false);
        this._categoriesSubject$.next(categories);
      }),
      catchError((error) => {
        this._isCreateLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public remove(categoryId: CategoryId): Observable<Response> {
    this._isDeleteLoading$.next(true);

    return this.http.delete<Response>(`${ApiEntities.CATEGORY}/${categoryId}`).pipe(
      tap(() => {
        const categories = this._categoriesSubject$.value.filter(({ _id }) => _id !== categoryId);

        this._categoriesSubject$.next(categories);
        this._isDeleteLoading$.next(false);
      }),
      catchError((error) => {
        this._isDeleteLoading$.next(false);

        return this.errorService.handleError(error);
      }),
    );
  }

  public reset(): void {
    this._categoriesSubject$.next([]);
    this._isCreateLoading$.next(false);
    this._isFetchLoading$.next(false);
    this._isDeleteLoading$.next(false);
  }

  public get categories$(): Observable<Category[]> {
    return this._categoriesSubject$.asObservable();
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

  private createFormData(name: string, categoryImage: Nullable<File>): FormData {
    const fordData = new FormData();

    if (categoryImage) {
      const { name } = categoryImage;

      fordData.append('image', categoryImage, name);
    }

    fordData.append('name', name);

    return fordData;
  }
}
