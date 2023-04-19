import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { AnalyticsService } from '../services/analytics.service';
import { createChartConfig } from '../utils/charts';

@Component({
  selector: 'app-analytics-charts',
  templateUrl: './analytics-charts.component.html',
  styleUrls: ['./analytics-charts.component.scss'],
})
export class AnalyticsChartsComponent implements AfterViewInit {
  @ViewChild('incomeChart') incomeChartRef: ElementRef;
  @ViewChild('ordersChart') ordersChartRef: ElementRef;

  constructor(public analyticsService: AnalyticsService) {
    Chart.register(...registerables);
  }

  public ngAfterViewInit(): void {
    this.createCharts();
  }

  public isChartData(): boolean {
    return (
      !!this.analyticsService.charts &&
      !!this.analyticsService.charts.income.data.length &&
      !!this.analyticsService.charts.orders.data.length
    );
  }

  private createCharts(): void {
    if (!this.isChartData()) {
      return;
    }

    const { income, orders } = this.analyticsService.charts!;
    const incomeContext = this.incomeChartRef.nativeElement.getContext('2d');
    const ordersContext = this.ordersChartRef.nativeElement.getContext('2d');

    new Chart(incomeContext, createChartConfig(income));
    new Chart(ordersContext, createChartConfig(orders));
  }
}
