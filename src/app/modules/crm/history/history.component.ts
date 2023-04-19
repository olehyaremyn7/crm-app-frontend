import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RetryService } from '../../../shared/services/retry.service';
import { OrderService } from '../order/services/order.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  private ordersSubscription: Subscription;
  private retrySubscription: Subscription;
  public isShowFilter = false;

  constructor(private retryService: RetryService, public orderService: OrderService) {}

  public ngOnInit(): void {
    this.retrySubscription = this.retryService.onRetry.subscribe({
      next: () => this.getOrders(),
    });

    this.getOrders();
  }

  public getOrders(): void {
    this.ordersSubscription = this.orderService.fetch().subscribe();
  }

  public toggleFilter(): void {
    this.isShowFilter = !this.isShowFilter;
  }

  public ngOnDestroy(): void {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }

    if (this.retrySubscription) {
      this.retrySubscription.unsubscribe();
    }

    this.orderService.reset();
  }
}
