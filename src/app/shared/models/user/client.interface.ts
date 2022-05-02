import { Role } from './role.enum';
export interface Client {
  displayName: string;
  role: Role.Client;
  sellerUid: string;
  uid: string;
}
