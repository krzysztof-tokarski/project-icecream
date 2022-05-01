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
    let value;
    const userFromStorage = JSON.parse(localStorage.getItem('user')!) as User;
    if (userFromStorage.uid.match('8JQOCItqF7fwWLVG9HAU3BvGKmt2')) {
      return (value = true);
    } else {
      return this.router.navigate(['app', 'ordering-panel']);
    }
  }
}
