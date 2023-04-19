import { Response } from '../../../../shared/interfaces';

export interface AnalyticsResponse extends Response, Analytics {}

export interface Analytics {
  average: number;
  charts: AnalyticsCharts;
}

export type AnalyticsCharts = Record<Charts, ChartData>;

export enum Charts {
  INCOME = 'income',
  ORDERS = 'orders',
}

export interface ChartData {
  label: string;
  color: string;
  labels: string[];
  data: number[];
}
