import { UserType } from './../../shared/models/user/user.type';
import { Role } from '@shared/models/user/role.enum';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  public canActivate(route: ActivatedRouteSnapshot) {
    const canActivateRoles = route.data['roles'] as Role[];
    const selectRole = (state: AppState) => state.user.currentUser as UserType;
    return this.store.select(selectRole).pipe(
      map(user => canActivateRoles.includes(user.role)),
      tap(canActivate => {
        if (canActivate) {
          return;
        }
      })
    );
  }
}
