import { Merchant } from './merchant';
import { OrderedItem } from './ordered-item';

export interface Order {
  id: string;
  completed_date?: Date;
  deadline: Date;
  order_date: Date;
  status: 'completed' | 'pending' | 'cancelled';
  total: number;
  items: OrderedItem[];
  merchant: Merchant;
}
