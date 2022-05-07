import { Icecream } from '../ice-cream/icecream.interface';
import { Unit } from '../ice-cream/unit.interface';

export interface Order {
  orderId: string;
  clientUid: string;
  clientDisplayName: string;
  sellerUid: string;
  sellerDisplayName: string;
  icecream: Icecream;
  unit: Unit;
  amount: number;
  date: string;
}
