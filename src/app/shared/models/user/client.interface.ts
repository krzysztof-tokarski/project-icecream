import { Order } from './../order/order.interface';
import { Role } from './role.enum';
export interface Client {
  displayName: string;
  role: Role.Client;
  sellerUid: string;
  uid: string;
  lastOrder?: Order;
}
