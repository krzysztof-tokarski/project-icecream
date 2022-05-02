import { Seller } from '../../shared/models/user/seller.interface';
import { Role } from '@shared/models/user/role.enum';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  public canActivate(): any {
    const userFromStorage: Seller = JSON.parse(localStorage.getItem('user')!);
    console.log(userFromStorage);
    if (userFromStorage.role != Role.Seller) {
      return this.router.navigate(['ordering-panel']);
    } else {
      // return this.router.navigate(['app', 'ordering-panel']);
    }
  }
}
