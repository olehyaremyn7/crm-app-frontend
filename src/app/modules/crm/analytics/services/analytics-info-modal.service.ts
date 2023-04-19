import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Nullable } from '../../../../shared/interfaces';
import { AnalyticsInfoComponent } from '../analytics-info/analytics-info.component';

@Injectable()
export class AnalyticsInfoModalService {
  private _dialogRef: Nullable<MatDialogRef<AnalyticsInfoComponent>>;

  constructor(private dialog: MatDialog) {}

  public open(): void {
    this._dialogRef = this.dialog.open<AnalyticsInfoComponent>(AnalyticsInfoComponent, {
      autoFocus: 'first-tabbable',
      width: '650px',
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
