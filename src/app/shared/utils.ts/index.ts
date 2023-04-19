import { environment } from 'src/environments/environment';

import { OrderPosition } from '../../modules/crm/order/interfaces/order';
import { Nullable } from '../interfaces';

const { API_ENDPOINT } = environment;

export const storage = <T>(key: string, data: Nullable<T> = null, isRemove = false): T | void => {
  if (isRemove) {
    localStorage.removeItem(key);
  }

  if (!data) {
    const storedData = localStorage.getItem(key);

    if (storedData) {
      return JSON.parse(storedData) as T;
    }
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export const getTotalPrice = (orderPositions: Omit<OrderPosition, '_id'>[]): number =>
  orderPositions.reduce<number>((total, { cost, quantity }) => total + cost * quantity, 0);

export const isObjectEmpty = <T>(obj: T): boolean => obj && Object.keys(obj).length !== 0;

export const getImagePath = (imagePath: string): string => `${API_ENDPOINT}/${imagePath}`;
