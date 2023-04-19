import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RetryService } from '../../../shared/services/retry.service';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsInfoModalService } from './services/analytics-info-modal.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  private analyticsSubscription: Subscription;
  private retrySubscription: Subscription;

  constructor(
    private retryService: RetryService,
    private analyticsInfo: AnalyticsInfoModalService,
    public analyticsService: AnalyticsService,
  ) {}

  public ngOnInit(): void {
    this.retrySubscription = this.retryService.onRetry.subscribe({
      next: () => this.getAnalytics(),
    });

    this.getAnalytics();
  }

  private getAnalytics(): void {
    this.analyticsSubscription = this.analyticsService.fetch().subscribe();
  }

  public openInfoDialog(): void {
    this.analyticsInfo.open();
  }

  public ngOnDestroy(): void {
    if (this.analyticsSubscription) {
      this.analyticsSubscription.unsubscribe();
    }

    if (this.retrySubscription) {
      this.retrySubscription.unsubscribe();
    }

    this.analyticsService.reset();
    this.analyticsInfo.destroy();
  }
}
