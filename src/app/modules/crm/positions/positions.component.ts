import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NotificationService } from '../../../shared/services/notification.service';
import { RetryService } from '../../../shared/services/retry.service';
import { CrmPaths } from '../interfaces/routes';
import { PositionFormModalService } from './services/position-form-modal.service';
import { PositionsService } from './services/positions.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
})
export class PositionsComponent implements OnInit, OnDestroy {
  private positionsSubscription: Subscription;
  private routeSubscription: Subscription;
  private retrySubscription: Subscription;

  constructor(
    private retryService: RetryService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private positionForm: PositionFormModalService,
    public positionsService: PositionsService,
  ) {}

  public ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe({
      next: (params) => {
        if (params['categoryId']) {
          this.positionsService.setCategoryId = params['categoryId'];
          this.getPositions();
        }
      },
      error: () => {
        this.notification.message('Unable to access positions. Category information is missing');
        this.router.navigate([CrmPaths.ASSORTMENT]);
      },
    });

    this.retrySubscription = this.retryService.onRetry.subscribe({
      next: () => this.getPositions(),
    });
  }

  private getPositions(): void {
    this.positionsSubscription = this.positionsService.fetch().subscribe();
  }

  public openForm(): void {
    this.positionForm.open({
      isEdit: false,
    });
  }

  public ngOnDestroy(): void {
    if (this.positionsSubscription) {
      this.positionsSubscription.unsubscribe();
    }

    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

    if (this.retrySubscription) {
      this.retrySubscription.unsubscribe();
    }

    this.notification.destroy();
    this.positionForm.destroy();
    this.positionsService.reset();
  }
}
