import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlertProps } from '../../interfaces/alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnDestroy {
  constructor(@Inject(MAT_DIALOG_DATA) public alertProps: AlertProps, private alertService: AlertService) {}

  public ngOnDestroy(): void {
    this.alertService.destroy();
  }
}
