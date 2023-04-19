import { Component, OnDestroy } from '@angular/core';

import { AnalyticsInfoModalService } from '../services/analytics-info-modal.service';

@Component({
  selector: 'app-analytics-info',
  templateUrl: './analytics-info.component.html',
  styleUrls: ['./analytics-info.component.scss'],
})
export class AnalyticsInfoComponent implements OnDestroy {
  constructor(private analyticsInfo: AnalyticsInfoModalService) {}

  public close(): void {
    this.analyticsInfo.close();
  }

  public ngOnDestroy(): void {
    this.analyticsInfo.destroy();
  }
}
