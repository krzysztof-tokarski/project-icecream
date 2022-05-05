import { Order } from './../order/order.interface';
import { Icecream } from '../ice-cream/icecream.interface';
import { Role } from './role.enum';
export interface Client {
  displayName: string;
  role: Role.Client;
  sellerUid: string;
  uid: string;
  orderList?: Order[];
  // to do
  favIcecreamList?: Icecream[];
  lastOrder?: Order;
}
