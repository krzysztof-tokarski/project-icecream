import { Injectable } from '@angular/core';
import { UserType } from '@shared/models/user/user.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: BehaviorSubject<UserType>;

  public get user$() {
    return this.user.asObservable();
  }

  public setUser(user: UserType) {
    this.user = new BehaviorSubject(user);
  }
}
