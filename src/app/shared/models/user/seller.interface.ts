import { Role } from './role.enum';

export interface Seller {
  displayName: string;
  role: Role.Seller;
  uid: string;
}
