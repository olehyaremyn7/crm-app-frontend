import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmProps } from '../../interfaces/confirm';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnDestroy {
  constructor(@Inject(MAT_DIALOG_DATA) public confirmProps: ConfirmProps, private confirmService: ConfirmService) {}

  public cancel(): void {
    this.confirmService.cancelRemoveConfirm();
  }

  public confirm(): void {
    this.confirmService.confirmRemove();
  }

  public ngOnDestroy(): void {
    this.confirmService.destroyRemoveConfirm();
  }
}
