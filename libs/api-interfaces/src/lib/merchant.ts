import { Location } from './location';
import { Item } from './item';

export interface Merchant {
  id: string;
  name: string;
  banner_url: string;
  logo_url: string;
  description: string;
  location: Location;
  phone_number: string;
  inventory: number;
  items: Item[];
  price: number | null;
  deadline: null;
}
