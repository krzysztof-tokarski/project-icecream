import { Icecream } from '../ice-cream/icecream.interface';
import { Unit } from '../ice-cream/unit.interface';
import { Client } from '../user/client.interface';
import { Seller } from '../user/seller.interface';

export interface Order {
  orderId: string;
  client: Client;
  seller: Seller;
  icecream: Icecream;
  unit: Unit;
  amount: number;
  date: string;
}
