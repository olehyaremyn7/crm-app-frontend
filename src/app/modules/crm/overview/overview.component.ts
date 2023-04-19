import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RetryService } from '../../../shared/services/retry.service';
import { AnalyticsService } from '../analytics/services/analytics.service';
import { OverviewAboutModalService } from './services/overview-about-modal.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  private overviewSubscription: Subscription;
  private retrySubscription: Subscription;

  constructor(
    private retryService: RetryService,
    private overviewAbout: OverviewAboutModalService,
    public analyticsService: AnalyticsService,
  ) {}

  public ngOnInit(): void {
    this.retrySubscription = this.retryService.onRetry.subscribe({
      next: () => this.getOverview(),
    });

    this.getOverview();
  }

  private getOverview(): void {
    this.overviewSubscription = this.analyticsService.getOverview().subscribe();
  }

  public openAboutDialog(): void {
    this.overviewAbout.open();
  }

  public ngOnDestroy(): void {
    if (this.overviewSubscription) {
      this.overviewSubscription.unsubscribe();
    }

    if (this.retrySubscription) {
      this.retrySubscription.unsubscribe();
    }

    this.analyticsService.reset();
    this.overviewAbout.destroy();
  }
}
