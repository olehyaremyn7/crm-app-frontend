import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Nullable } from '../../../../shared/interfaces';
import { OrderCartModalResult } from '../interfaces/orderCartModal';
import { OrderCartComponent } from '../order-cart/order-cart.component';

@Injectable()
export class OrderCartModalService {
  private _dialogRef: Nullable<MatDialogRef<OrderCartComponent, OrderCartModalResult>>;

  constructor(private dialog: MatDialog) {}

  public open(): void {
    this._dialogRef = this.dialog.open<OrderCartComponent>(OrderCartComponent, {
      disableClose: true,
      width: '800px',
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
