import { Icecream } from './icecream.interface';
import { Role } from './role.enum';

export interface Seller {
  clientList: any[];
  displayName: string;
  icecreamList: Icecream[];
  orders: any[];
  role: Role.Seller;
  timestamp: any;
  uid: string;
  unitList: any[];
}
