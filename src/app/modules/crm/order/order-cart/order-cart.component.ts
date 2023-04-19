import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { NotificationService } from '../../../../shared/services/notification.service';
import { PositionId } from '../../positions/interfaces';
import { CART_TABLE_COLUMNS } from '../constants/tables';
import { OrderPosition } from '../interfaces/order';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { OrderCartModalService } from '../services/order-cart-modal.service';
import { createdNewOrderMessage } from '../utils';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss'],
})
export class OrderCartComponent implements OnInit, OnDestroy {
  private orderPositionsSubscription: Subscription;
  private orderSubscription: Subscription;
  public tableDataSource = new MatTableDataSource<OrderPosition>();
  public tableColumns = CART_TABLE_COLUMNS;

  constructor(
    private cartModal: OrderCartModalService,
    private notification: NotificationService,
    public cart: CartService,
    public orderService: OrderService,
  ) {}

  public ngOnInit(): void {
    this.orderPositionsSubscription = this.cart.orderPositions$.subscribe({
      next: (orderPositions) => {
        this.tableDataSource.data = orderPositions;
      },
    });
  }

  public getTotalCost(): number {
    return this.cart.price;
  }

  public deletePosition(id: PositionId): void {
    this.cart.remove(id);

    if (!this.cart.isOrderPositions) {
      this.closeModal();
    }
  }

  public checkout(): void {
    this.orderSubscription = this.orderService.create(this.cart.prepare()).subscribe({
      next: ({ message, order: { order: orderNumber } }) => {
        this.notification.message(createdNewOrderMessage(message, orderNumber!));
        this.closeModal();
        this.cart.clear();
      },
      error: () => {
        this.closeModal();
      },
    });
  }

  public closeModal(): void {
    this.cartModal.close();
  }

  public ngOnDestroy(): void {
    if (this.orderPositionsSubscription) {
      this.orderPositionsSubscription.unsubscribe();
    }

    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }

    this.cartModal.destroy();
    this.notification.destroy();
  }
}
