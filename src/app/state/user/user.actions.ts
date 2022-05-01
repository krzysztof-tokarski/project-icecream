import { createAction, props } from '@ngrx/store';
import { UserCredential } from 'firebase/auth';

export const UserActions = {
  signInCurrentUser: createAction('[User] Sign-in user', props<UserCredential>()),
  signOutCurrentUser: createAction('[User] Sign-out user'),
};
