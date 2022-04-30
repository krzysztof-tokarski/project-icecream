import { createAction } from '@ngrx/store';

export const AuthActions = {
  setAuth: createAction('[Auth] Set Auth'),
  setUnAuth: createAction('[Auth] Set UnAuth'),
};
