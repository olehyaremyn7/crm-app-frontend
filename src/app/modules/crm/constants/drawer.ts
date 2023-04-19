import { CrmDrawerLabels, CrmDrawerLink } from '../interfaces/drawer';
import { CrmPaths } from '../interfaces/routes';

export const DEFAULT_CRM_DRAWER_LINKS: CrmDrawerLink[] = [
  { path: CrmPaths.OVERVIEW, label: CrmDrawerLabels.OVERVIEW, icon: 'query_stats' },
  {
    path: CrmPaths.ANALYTICS,
    label: CrmDrawerLabels.ANALYTICS,
    icon: 'show_chart',
  },
  { path: CrmPaths.ASSORTMENT, label: CrmDrawerLabels.ASSORTMENT, icon: 'category' },
  { path: CrmPaths.ORDER, label: CrmDrawerLabels.ORDER, icon: 'shopping_cart' },
  { path: CrmPaths.HISTORY, label: CrmDrawerLabels.HISTORY, icon: 'history' },
];
