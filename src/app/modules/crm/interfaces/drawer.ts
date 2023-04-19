import { CrmPaths } from './routes';

export interface CrmDrawerLink {
  label: CrmDrawerLabels;
  path: CrmPaths;
  icon: string;
}

export enum CrmDrawerLabels {
  OVERVIEW = 'Overview',
  ANALYTICS = 'Analytics',
  ASSORTMENT = 'Assortment',
  ORDER = 'New order',
  HISTORY = 'History',
}
