import { Component, Input } from '@angular/core';

import { RetryService } from '../../services/retry.service';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent {
  @Input() text: string;

  constructor(public retryService: RetryService) {}

  public retry(): void {
    this.retryService.emit();
  }
}
