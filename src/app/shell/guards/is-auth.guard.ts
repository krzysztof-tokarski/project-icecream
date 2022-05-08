import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { tap } from 'rxjs';

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
  }
}
