import { UserService } from './user.service';
import { LoginFormValue } from './login-form/login-form.interface';
import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { getAuth, signOut } from 'firebase/auth';
import { UserActions } from '@state/user/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private store: Store<AppState>, private userService: UserService) {
    const userFromStorage: User | null = JSON.parse(localStorage.getItem('user') as string);

    if (!userFromStorage) {
      this.signOut();
      return;
    }

    this.setStateAfterAuth(userFromStorage);
  }

  public signIn(form: LoginFormValue) {
    signInWithEmailAndPassword(getAuth(), form.email, form.password)
      .then(userCredential => {
        localStorage.setItem('user', JSON.stringify(userCredential.user));
        this.store.dispatch(AuthActions.setAuth());
        // this.store.dispatch(UserActions.signInCurrentUser(userCredential));
        const userFromStorage: User | null = JSON.parse(localStorage.getItem('user') as string);
        console.log(userFromStorage);
        if (userFromStorage?.uid === '8JQOCItqF7fwWLVG9HAU3BvGKmt2') {
          this.router.navigate(['app', 'management-panel']);
        } else {
          this.router.navigate(['app', 'ordering-panel']);
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error logging user', errorCode, errorMessage);
      });
  }

  public signOut() {
    signOut(getAuth());
    this.store.dispatch(AuthActions.setUnAuth());
    this.store.dispatch(UserActions.signOutCurrentUser());
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
  }

  private setStateAfterAuth(user: User) {
    this.userService.setUser(user);
    this.store.dispatch(AuthActions.setAuth());
    this.store.dispatch(UserActions.signInCurrentUser(user));
    this.router.navigate(['app', 'management-panel']);
  }
}
