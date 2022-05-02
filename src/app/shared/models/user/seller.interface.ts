import { Icecream } from '../ice-cream/icecream.interface';
import { Role } from './role.enum';

export interface Seller {
  clientList: string[];
  displayName: string;
  icecreamList: Icecream[];
  orders: any[];
  role: Role.Seller;
  timestamp: any;
  uid: string;
  unitList: any[];
}
