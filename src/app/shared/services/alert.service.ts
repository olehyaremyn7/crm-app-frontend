import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AlertComponent } from '../components/alert/alert.component';
import { Nullable } from '../interfaces';
import { AlertProps } from '../interfaces/alert';

@Injectable()
export class AlertService {
  private _dialogRef: Nullable<MatDialogRef<AlertComponent>>;

  constructor(private dialog: MatDialog) {}

  public success(message: string): void {
    this.open({
      message,
      title: 'Done',
      icon: 'done',
    });
  }

  public warning(message: string): void {
    this.open({
      message,
      title: 'Warning',
      icon: 'warning',
    });
  }

  public error(message: string): void {
    this.open({
      message,
      title: 'Error',
      icon: 'error',
    });
  }

  public close(): void {
    this._dialogRef?.close();
  }

  public destroy(): void {
    this.dialog.ngOnDestroy();
    this._dialogRef = null;
  }

  private open(data: AlertProps): void {
    this._dialogRef = this.dialog.open<AlertComponent, AlertProps>(AlertComponent, {
      data,
      minWidth: 300,
      maxWidth: 400,
      autoFocus: 'first-tabbable',
    });
  }
}
