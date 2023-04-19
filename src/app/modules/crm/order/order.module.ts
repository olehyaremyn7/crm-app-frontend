import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/modules/shared.module';
import { CategoriesService } from '../categories/services/categories.service';
import { PositionsService } from '../positions/services/positions.service';
import { OrderComponent } from './order.component';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { OrderCategoriesComponent } from './order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-positions/order-positions.component';
import { OrderRoutingModule } from './order-routing.module';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { OrderCartModalService } from './services/order-cart-modal.service';

@NgModule({
  declarations: [OrderComponent, OrderCartComponent, OrderCategoriesComponent, OrderPositionsComponent],
  imports: [CommonModule, SharedModule, OrderRoutingModule],
  providers: [OrderService, OrderCartModalService, CartService, CategoriesService, PositionsService],
})
export class OrderModule {}
