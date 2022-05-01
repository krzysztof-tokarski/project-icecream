import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: BehaviorSubject<User>;

  public get user$() {
    return this.user.asObservable();
  }

  public setUser(user: User) {
    this.user = new BehaviorSubject(user);
    console.log(user);
  }
}
