import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserState } from './user.state';

const initialState: UserState = {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  currentUser: JSON.parse(localStorage.getItem('user')!),
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.signInCurrentUser, (state, user) => {
    return {
      ...state,
      currentUser: user,
    };
  }),
  on(UserActions.signOutCurrentUser, state => {
    return {
      ...state,
      currentUser: null,
    };
  })
);
