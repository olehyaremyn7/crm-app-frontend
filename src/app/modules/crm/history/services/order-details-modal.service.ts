import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Nullable } from '../../../../shared/interfaces';
import { HistoryOrderDetailsComponent } from '../history-order-details/history-order-details.component';
import { OrderDetailsModalProps, OrderDetailsModalResult } from '../interfaces/orderDetailsModal';

@Injectable()
export class OrderDetailsModalService {
  private _dialogRef: Nullable<MatDialogRef<HistoryOrderDetailsComponent, OrderDetailsModalResult>>;

  constructor(private dialog: MatDialog) {}

  public open(data: OrderDetailsModalProps): void {
    this._dialogRef = this.dialog.open<HistoryOrderDetailsComponent>(HistoryOrderDetailsComponent, {
      disableClose: true,
      width: '800px',
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
