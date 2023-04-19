import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../shared/services/alert.service';
import { ErrorService } from '../../shared/services/error.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  private errorSubscription: Subscription;

  constructor(
    private alert: AlertService,
    private notification: NotificationService,
    private errorService: ErrorService,
  ) {}

  public ngOnInit(): void {
    this.errorSubscription = this.errorService.error$.subscribe({
      next: ({ message, type }) => {
        if (type === 'error') {
          this.alert.error(message);
        } else {
          this.notification.message(message);
        }
      },
    });
  }

  public ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }

    this.alert.destroy();
    this.notification.destroy();
  }
}
