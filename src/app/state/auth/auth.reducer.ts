import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.state';

const initialState: AuthState = {
  isAuth: !!localStorage.getItem('user'),
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuth, state => {
    return {
      ...state,
      isAuth: true,
    };
  }),
  on(AuthActions.setUnAuth, state => {
    return {
      ...state,
      isAuth: false,
    };
  })
);
