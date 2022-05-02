import { Seller } from '../shared/models/user/seller.interface';
import { UserService } from './user.service';
import { LoginFormValue } from './login-form/login-form.interface';
import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { getAuth, signOut } from 'firebase/auth';
import { UserActions } from '@state/user/user.actions';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Role } from '@shared/models/user/role.enum';
import { UserType } from '@shared/models/user/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private store: Store<AppState>, private userService: UserService) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userFromStorage: UserType = JSON.parse(localStorage.getItem('user')!);
    if (!userFromStorage) {
      this.signOut();
      return;
    }
    this.setStateAfterAuth(userFromStorage);
  }

  public signIn(form: LoginFormValue) {
    signInWithEmailAndPassword(getAuth(), form.email, form.password).then(async userCredential => {
      await this.getUserFromDB(userCredential.user.uid).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error logging user', errorCode, errorMessage);
      });
    });
  }

  public signOut() {
    signOut(getAuth());
    this.store.dispatch(AuthActions.setUnAuth());
    this.store.dispatch(UserActions.signOutCurrentUser());
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
  }

  private async setStateAfterAuth(user: UserType) {
    this.userService.setUser(user);
    this.store.dispatch(AuthActions.setAuth());
    this.store.dispatch(UserActions.signInCurrentUser(user));
    this.router.navigateByUrl('app');
  }
  // this.router.navigateByUrl('app/management-panel/icecream-manager/global-units');

  private async getUserFromDB(uid: string) {
    const docSnap = await getDoc(doc(getFirestore(), 'users', uid));
    const user = docSnap.data() as UserType;
    localStorage.setItem('user', JSON.stringify(user));
    this.setStateAfterAuth(user);
  }
}
