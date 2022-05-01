import { tap } from 'rxjs';
import { UserActions } from './../../state/user/user.actions';
import { LoginFormValue } from './login-form.interface';
import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthActions } from 'src/app/state/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginFormFirebaseProxyService {
  constructor(private router: Router, private store$: Store<AppState>) {}

  public signIn(form: LoginFormValue, auth: Auth) {
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        this.store$.dispatch(AuthActions.setAuth());
        this.store$.dispatch(UserActions.signInCurrentUser(userCredential));
        const userFromStorage: User | null = JSON.parse(localStorage.getItem('user') as string);
        if (userFromStorage?.uid === 'SQgYGivSXocRUDHcJkRqhGpYBQn2') {
          this.router.navigate(['management-panel']);
        } else {
          this.router.navigate(['ordering-panel']);
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error logging user', errorCode, errorMessage);
      });
  }
}
