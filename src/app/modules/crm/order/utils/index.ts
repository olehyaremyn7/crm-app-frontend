import { CrmPaths } from '../../interfaces/routes';

export const createdNewOrderMessage = (str: string, orderNumber: number): string =>
  `${str.slice(0, 10)}№${orderNumber}${str.slice(9)}`;

export const isRootPage = (url: string): boolean => url === CrmPaths.ORDER;
