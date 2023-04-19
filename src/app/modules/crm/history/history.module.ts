import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/modules/shared.module';
import { OrderService } from '../order/services/order.service';
import { HistoryComponent } from './history.component';
import { HistoryFilterComponent } from './history-filter/history-filter.component';
import { HistoryOrderDetailsComponent } from './history-order-details/history-order-details.component';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryTableComponent } from './history-table/history-table.component';
import { OrderDetailsModalService } from './services/order-details-modal.service';

@NgModule({
  declarations: [HistoryComponent, HistoryTableComponent, HistoryFilterComponent, HistoryOrderDetailsComponent],
  imports: [CommonModule, SharedModule, HistoryRoutingModule],
  providers: [OrderService, OrderDetailsModalService],
})
export class HistoryModule {}
