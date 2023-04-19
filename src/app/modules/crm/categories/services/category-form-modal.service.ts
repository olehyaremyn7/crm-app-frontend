import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Nullable } from '../../../../shared/interfaces';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryFormModalProps, CategoryFormModalResult } from '../interfaces/categoryFormModal';

@Injectable()
export class CategoryFormModalService {
  private _dialogRef: Nullable<MatDialogRef<CategoryFormComponent, CategoryFormModalResult>>;

  constructor(private dialog: MatDialog) {}

  public open(data: CategoryFormModalProps): void {
    this._dialogRef = this.dialog.open<CategoryFormComponent, CategoryFormModalProps>(CategoryFormComponent, {
      disableClose: true,
      autoFocus: 'first-tabbable',
      data,
    });
  }

  public close(): void {
    this._dialogRef?.close();
  }

  public destroy(): void {
    this.dialog.ngOnDestroy();
    this._dialogRef = null;
  }
}
