import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { Unit } from '../ice-cream/unit.interface';
import { Client } from './client.interface';
import { Role } from './role.enum';

export interface Seller {
  displayName: string;
  role: Role.Seller;
  uid: string;
  icecreamList?: Icecream[];
  clientList?: Client[];
  orderList?: any[];
  unitList?: Unit[];
}
