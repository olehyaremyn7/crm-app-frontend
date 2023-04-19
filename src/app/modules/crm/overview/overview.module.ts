import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/modules/shared.module';
import { AnalyticsService } from '../analytics/services/analytics.service';
import { OverviewComponent } from './overview.component';
import { OverviewAboutComponent } from './overview-about/overview-about.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewStatsComponent } from './overview-stats/overview-stats.component';
import { OverviewAboutModalService } from './services/overview-about-modal.service';

@NgModule({
  declarations: [OverviewComponent, OverviewStatsComponent, OverviewAboutComponent],
  imports: [CommonModule, SharedModule, OverviewRoutingModule],
  providers: [AnalyticsService, OverviewAboutModalService],
})
export class OverviewModule {}
