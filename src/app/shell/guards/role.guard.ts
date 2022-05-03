/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from '@shared/models/user/role.enum';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { map, tap } from 'rxjs';
import { UserService } from '@auth/user.service';

const selectRole: any = (state: AppState) => state.user.currentUser?.role;
// to do

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>, private userService: UserService) {}

  public canActivate(route: ActivatedRouteSnapshot): any {
    const canActivateRoles = route.data['roles'] as Role[];

    return this.store.select(selectRole).pipe(
      map(role => canActivateRoles.includes(role)),
      tap(canActivate => {
        if (canActivate) {
          return;
        }
      })
    );
  }
}
