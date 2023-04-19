import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Nullable } from '../../../../shared/interfaces';
import { OverviewAboutComponent } from '../overview-about/overview-about.component';

@Injectable()
export class OverviewAboutModalService {
  private _dialogRef: Nullable<MatDialogRef<OverviewAboutComponent>>;

  constructor(private dialog: MatDialog) {}

  public open(): void {
    this._dialogRef = this.dialog.open<OverviewAboutComponent>(OverviewAboutComponent, {
      autoFocus: 'first-tabbable',
      width: '500px',
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
