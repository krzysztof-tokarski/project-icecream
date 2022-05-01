import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '@auth/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  public async canActivate(): Promise<any> {
    let value;
    await this.userService.user$.subscribe(user => {
      if (user.uid.match('SQgYGivSXocRUDHcJkRqhGpYBQn2')) {
        return (value = true);
      } else {
        return this.router.navigate(['ordering-panel']);
      }
    });
    return value;
  }
}

// return this.store.select(selectCurrentUser).pipe(
//   tap(isRegular => {
//     console.log(isRegular);
//     if (isRegular === 'SQgYGivSXocRUDHcJkRqhGpYBQn2') {
//       return;
//     } else {
//       this.router.navigateByUrl('/ordering-panel');
//     }
//   })
