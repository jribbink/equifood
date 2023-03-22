import { Merchant } from './merchant';
import { OrderedItem } from './ordered-item';

// Stores orders statuses and their respective indices
export enum ORDER_STATUS {
  cancelled = -1,
  pending,
  confirmed,
  completed,
}
export interface Order {
  id: string;
  completed_date?: Date;
  deadline: Date;
  order_date: Date;
  status: ORDER_STATUS;
  total: number;
  items: OrderedItem[];
  merchant: Merchant;
}
