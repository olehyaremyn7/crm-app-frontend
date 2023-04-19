import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmComponent } from '../components/confirm/confirm.component';
import { Nullable } from '../interfaces';
import { ConfirmProps, ConfirmResult } from '../interfaces/confirm';

@Injectable()
export class ConfirmService {
  private _dialogRef: Nullable<MatDialogRef<ConfirmComponent, ConfirmResult>>;

  constructor(private dialog: MatDialog) {}

  public openRemoveConfirm(message: string, callback: (result: ConfirmResult) => void): void {
    this._dialogRef = this.dialog.open<ConfirmComponent, ConfirmProps, ConfirmResult>(ConfirmComponent, {
      data: {
        icon: 'delete',
        message,
      },
      minWidth: 300,
      maxWidth: 400,
      autoFocus: 'first-tabbable',
    });

    this._dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          callback(result);
        }
      },
    });
  }

  public confirmRemove(): void {
    this._dialogRef?.close({ confirmed: true });
  }

  public cancelRemoveConfirm(): void {
    this._dialogRef?.close({ confirmed: false });
  }

  public destroyRemoveConfirm(): void {
    this.dialog.ngOnDestroy();
    this._dialogRef = null;
  }
}
