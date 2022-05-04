import { Icecream } from '../ice-cream/icecream.interface';
import { Role } from './role.enum';
export interface Client {
  displayName: string;
  role: Role.Client;
  sellerUid: string;
  uid: string;
  orderList?: any[];
  // to do
  favIcecreamList?: Icecream[];
}
