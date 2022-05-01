import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = {
  currentUser: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.signInCurrentUser, (state, userCredential) => {
    return {
      ...state,
      currentUser: userCredential.user,
    };
  }),
  on(UserActions.signOutCurrentUser, state => {
    return {
      ...state,
      currentUser: null,
    };
  })
);
