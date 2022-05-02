import { Role } from '@shared/models/user/role.enum';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { map, tap } from 'rxjs';
import { UserService } from '@auth/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>, private userService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  public canActivate(route: ActivatedRouteSnapshot) {
    const canActivateRoles = route.data['roles'] as Role[];

    return this.userService.user$.pipe(
      map(({ role }) => canActivateRoles.includes(role)),
      tap(canActivate => {
        console.log(canActivate);
        if (canActivate) {
          return;
        }

        alert('Ta opcja dostepna jest dla użytkowiników o roli: ' + canActivateRoles.join(', '));
      })
    );
  }
}
