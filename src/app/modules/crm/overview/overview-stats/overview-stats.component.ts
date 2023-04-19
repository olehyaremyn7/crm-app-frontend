import { Component } from '@angular/core';

import { AnalyticsService } from '../../analytics/services/analytics.service';

@Component({
  selector: 'app-overview-stats',
  templateUrl: 'overview-stats.component.html',
  styleUrls: ['overview-stats.component.scss'],
})
export class OverviewStatsComponent {
  constructor(public analyticsService: AnalyticsService) {}
}
