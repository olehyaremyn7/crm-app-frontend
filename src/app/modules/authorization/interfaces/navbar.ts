import { AuthPaths } from './routes';

export interface AuthTab {
  label: AuthTabsLabels;
  path: AuthPaths;
  index: number;
}

export enum AuthTabsLabels {
  LOGIN = 'Login',
  REGISTRATION = 'Registration',
}
