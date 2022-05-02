import { Icecream } from '@shared/types/icecream.interface';
import { Timestamp } from 'firebase/firestore';
import { Role } from './role.enum';
export interface Client {
  displayName: string;
  favIcereamList: Icecream[];
  orders: any[];
  role: Role.Client;
  sellerUid: string;
  timestamp: Timestamp;
  uid: string;
}
