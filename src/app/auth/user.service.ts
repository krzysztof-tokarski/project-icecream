import { Injectable } from '@angular/core';
import { Seller } from '@shared/types/seller.interface';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user!: BehaviorSubject<Seller>;

  public get user$() {
    return this.user.asObservable();
  }

  public setUser(user: Seller) {
    this.user = new BehaviorSubject(user);
    console.log(user);
  }
}
