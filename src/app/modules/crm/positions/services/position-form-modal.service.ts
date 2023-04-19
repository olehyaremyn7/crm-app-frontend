import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Nullable } from '../../../../shared/interfaces';
import { PositionFormModalProps, PositionFormModalResult } from '../interfaces/positionFormModal';
import { PositionFormComponent } from '../position-form/position-form.component';
@Injectable()
export class PositionFormModalService {
  private _dialogRef: Nullable<MatDialogRef<PositionFormComponent, PositionFormModalResult>>;

  constructor(private dialog: MatDialog) {}

  public open(data: PositionFormModalProps): void {
    this._dialogRef = this.dialog.open<PositionFormComponent, PositionFormModalProps>(PositionFormComponent, {
      disableClose: true,
      autoFocus: 'first-tabbable',
      width: '400px',
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
