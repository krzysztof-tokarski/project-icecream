import { UserType } from '@shared/models/user/user.type';

export interface UserState {
  currentUser: UserType | null;
}
