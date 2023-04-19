import { Order } from '../../order/interfaces/order';

export interface OrderDetailsModalResult {
  closed?: boolean;
}

export interface OrderDetailsModalProps {
  order: Order;
}
