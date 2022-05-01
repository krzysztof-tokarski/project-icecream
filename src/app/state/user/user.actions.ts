import { createAction, props } from '@ngrx/store';
import { User } from 'firebase/auth';

export const UserActions = {
  signInCurrentUser: createAction('[User] Sign-in user', props<User>()),
  signOutCurrentUser: createAction('[User] Sign-out user'),
};
