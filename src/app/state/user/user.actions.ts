import { UserType } from '@shared/models/user/user.type';
import { createAction, props } from '@ngrx/store';

export const UserActions = {
  signInCurrentUser: createAction('[User] Sign-in user', props<UserType>()),
  signOutCurrentUser: createAction('[User] Sign-out user'),
};
