import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { getTotalPrice } from '../../../../shared/utils.ts';
import { Order } from '../../order/interfaces/order';
import { HISTORY_ORDER_DETAILS_TABLE_COLUMNS } from '../constants/tables';
import { OrderDetailsModalProps } from '../interfaces/orderDetailsModal';
import { OrderDetailsModalService } from '../services/order-details-modal.service';

@Component({
  selector: 'app-history-order-details',
  templateUrl: './history-order-details.component.html',
  styleUrls: ['./history-order-details.component.scss'],
})
export class HistoryOrderDetailsComponent implements OnInit, OnDestroy {
  public order: Order;
  public tableColumns = HISTORY_ORDER_DETAILS_TABLE_COLUMNS;

  constructor(
    @Inject(MAT_DIALOG_DATA) private orderDetailsModalProps: OrderDetailsModalProps,
    private orderDetailsModal: OrderDetailsModalService,
  ) {}

  public ngOnInit(): void {
    const { order } = this.orderDetailsModalProps;

    if (order) {
      this.order = order;
    }
  }

  public getTotalCost(): number {
    const { list } = this.order;

    return getTotalPrice(list);
  }

  public closeModal(): void {
    this.orderDetailsModal.close();
  }

  public ngOnDestroy(): void {
    this.orderDetailsModal.destroy();
  }
}
