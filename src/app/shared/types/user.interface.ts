import { Role } from './role.enum';

export interface User {
  id: number;
  displayName: string;
  email: string;
  password: string;
  role: Role;
}
