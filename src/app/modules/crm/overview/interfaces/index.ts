import { Response } from '../../../../shared/interfaces';

export interface OverviewResponse extends Response {
  date: Date;
  overview: OverviewData[];
}

export interface OverviewData {
  entity: OverviewEntity;
  measurement: OverviewMeasurement;
  percent: number;
  compare: number;
  yesterday: number;
  isHigher: boolean;
  conclusion: string;
}

type OverviewEntity = 'Income' | 'Orders';
type OverviewMeasurement = 'dollar' | 'orders';
