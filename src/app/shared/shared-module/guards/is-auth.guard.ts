import { AuthState } from './../../../state/auth/auth.state';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsAuthGuard implements CanActivate {
  constructor(private store$: Store<AppState>, private router: Router) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public canActivate(): any {
    return this.store$
      .select(appState => appState.auth.isAuth)
      .pipe(
        map(authUser => {
          if (!authUser) {
            this.router.navigate(['auth']);
          }
          return authUser;
        })
      );
  }
}
