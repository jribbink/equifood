import { Location } from './location';

export interface Merchant {
  id: string;
  name: string;
  banner_url: string;
  logo_url: string;
  description: string;
  location: Location;
  phone_number: string;
  inventory: number;
  price: number | null;
  deadline: Date | null;
}
