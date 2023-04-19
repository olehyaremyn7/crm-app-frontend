import { AuthTab, AuthTabsLabels } from '../interfaces/navbar';
import { AuthPaths } from '../interfaces/routes';

export const DEFAULT_AUTH_TABS: AuthTab[] = [
  {
    label: AuthTabsLabels.LOGIN,
    path: AuthPaths.LOGIN,
    index: 0,
  },
  {
    label: AuthTabsLabels.REGISTRATION,
    path: AuthPaths.REGISTRATION,
    index: 1,
  },
];
