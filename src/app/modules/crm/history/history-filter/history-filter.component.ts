import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '../../../../shared/services/notification.service';
import { OrderService } from '../../order/services/order.service';
import { DateRangeGroup, Filter } from '../interfaces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
})
export class HistoryFilterComponent implements OnInit, OnDestroy {
  @Output() private onFilter = new EventEmitter<void>();
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService,
    public orderService: OrderService,
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      order: [null, [Validators.min(1)]],
      range: this.formBuilder.group<DateRangeGroup>({
        start: [null],
        end: [null],
      }),
    });

    if (this.orderService.filter) {
      const { order, start, end } = this.orderService.filter;

      this.form.patchValue({
        order,
        range: {
          start,
          end,
        },
      });
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const filter: Filter = {};
    const {
      order,
      range: { start, end },
    } = this.form.value;

    if (order) {
      filter.order = order;
    }

    if (start) {
      filter.start = start;
    }

    if (end) {
      filter.end = end;
    }

    this.orderService.applyFilter(filter);
    this.onFilter.emit();
    this.notification.message('Filter applied');
  }

  public reset(): void {
    this.form.reset();
  }

  public refetch(): void {
    this.form.reset();
    this.orderService.applyFilter(null);
    this.onFilter.emit();
    this.notification.message('Orders refreshed');
  }

  public isShowClearButton(): boolean {
    const {
      order,
      range: { start, end },
    } = this.form.value;

    return !(!!order || !!start || !!end);
  }

  public ngOnDestroy(): void {
    this.notification.destroy();
  }
}
