import { Role } from './role.enum';

export interface User {
  id: number;
  displayName: string;
  login: string;
  password: string;
  role: Role;
}
