import { LoginFormValue } from './login-form.interface';
import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthActions } from 'src/app/state/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginFormFirebaseProxyService {
  constructor(private router: Router, private store$: Store<AppState>) {}

  public async signIn(form: LoginFormValue, auth: Auth) {
    console.log(auth);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;
        this.store$.dispatch(AuthActions.setAuth());
        console.log(user);
        if (user.uid === 'SQgYGivSXocRUDHcJkRqhGpYBQn2') {
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
