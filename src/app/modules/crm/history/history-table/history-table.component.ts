import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { getTotalPrice } from '../../../../shared/utils.ts';
import { Order } from '../../order/interfaces/order';
import { OrderService } from '../../order/services/order.service';
import { HISTORY_TABLE_COLUMNS } from '../constants/tables';
import { OrderDetailsModalService } from '../services/order-details-modal.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() private onLoadMore = new EventEmitter<void>();
  @ViewChild(MatPaginator) private paginatorRef: MatPaginator;

  private ordersSubscription: Subscription;
  public tableDataSource = new MatTableDataSource<Order>();
  public tableColumns = HISTORY_TABLE_COLUMNS;

  constructor(private orderDetailsModal: OrderDetailsModalService, public orderService: OrderService) {}

  public ngOnInit(): void {
    this.ordersSubscription = this.orderService.orders$.subscribe({
      next: (positions) => {
        this.tableDataSource.data.push(...positions);
        this.tableDataSource._updateChangeSubscription();
        this.tableDataSource.paginator?._changePageSize(this.tableDataSource.data.length);
      },
    });
  }

  public ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginatorRef;
  }

  public orderPrice({ list }: Order): number {
    return getTotalPrice(list);
  }

  public viewDetails(order: Order): void {
    this.orderDetailsModal.open({
      order,
    });
  }

  public loadMore(): void {
    this.orderService.loadMore();
    this.onLoadMore.emit();
  }

  public ngOnDestroy(): void {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }

    this.orderDetailsModal.destroy();
  }
}
