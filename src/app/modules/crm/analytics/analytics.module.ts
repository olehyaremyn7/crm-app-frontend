import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/modules/shared.module';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsChartsComponent } from './analytics-charts/analytics-charts.component';
import { AnalyticsInfoComponent } from './analytics-info/analytics-info.component';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsInfoModalService } from './services/analytics-info-modal.service';

@NgModule({
  declarations: [AnalyticsComponent, AnalyticsChartsComponent, AnalyticsInfoComponent],
  imports: [CommonModule, SharedModule, AnalyticsRoutingModule],
  providers: [AnalyticsService, AnalyticsInfoModalService],
})
export class AnalyticsModule {}
