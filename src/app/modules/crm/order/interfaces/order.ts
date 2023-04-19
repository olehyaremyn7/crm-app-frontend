import { Response } from '../../../../shared/interfaces';
import { UserId } from '../../../authorization/interfaces';
import { Filter } from '../../history/interfaces';
import { PositionId } from '../../positions/interfaces';

export interface Order {
  date?: Date;
  order?: number;
  list: Omit<OrderPosition, '_id'>[];
  user?: UserId;
  _id?: OrderId;
}

export interface OrdersFetchParams extends Filter {
  offset: number;
  limit: number;
}

export interface OrderResponse extends Response {
  order: Order;
}

export interface OrdersResponse extends Response {
  orders: Order[];
}

export interface OrderPosition {
  name: string;
  cost: number;
  quantity: number;
  _id: PositionId;
}

export type OrderId = string;
