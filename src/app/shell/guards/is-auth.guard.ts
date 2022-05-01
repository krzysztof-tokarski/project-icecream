import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { map, Observable, take, tap } from 'rxjs';

const selectIsAuth = (state: AppState) => state.auth.isAuth;

@Injectable({
  providedIn: 'root',
})
export class IsAuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  public canActivate() {
    return this.store.select(selectIsAuth).pipe(
      tap(isAuth => {
        if (isAuth) {
          return;
        } else {
          this.router.navigate(['auth']);
        }
      })
    );

    // return this.store
    //   .select(appState => appState.auth.isAuth)
    //   .pipe(
    //     map(authUser => {
    //       if (!authUser) {
    //         this.router.navigate(['auth']);
    //       }
    //       return authUser;
    //     })
    //   );
  }
}
