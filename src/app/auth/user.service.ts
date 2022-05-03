import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserType } from '@shared/models/user/user.type';
import { AppState } from '@state/app.state';
import { UserActions } from '@state/user/user.actions';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: BehaviorSubject<UserType>;

  constructor(private store: Store<AppState>) {}

  public get user$() {
    return this.user.asObservable();
  }

  public setUser(user: UserType) {
    this.user = new BehaviorSubject(user);
    this.store.dispatch(UserActions.signInCurrentUser(user));
  }
}
