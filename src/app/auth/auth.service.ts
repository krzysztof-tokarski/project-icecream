/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/member-ordering */
import { LoginFormValue } from './login-form/login-form.interface';
import { Injectable } from '@angular/core';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthActions } from 'src/app/state/auth/auth.actions';
import { getAuth, signOut } from 'firebase/auth';
import { UserActions } from '@state/user/user.actions';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Role } from '@shared/models/user/role.enum';
import { UserType } from '@shared/models/user/user.type';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginFail = new BehaviorSubject<boolean>(false);
  public loginFailObservable = this.loginFail.asObservable();

  constructor(private router: Router, private store: Store<AppState>) {
    const userFromStorage: UserType = JSON.parse(sessionStorage.getItem('user')!);
    if (userFromStorage) {
      this.store.dispatch(AuthActions.setAuth());
    }
    if (!userFromStorage) {
      this.signOut();
      return;
    }
    this.setStateAfterAuth(userFromStorage);
  }

  private setStateAfterAuth(user: UserType) {
    this.store.dispatch(AuthActions.setAuth());
    this.store.dispatch(UserActions.signInCurrentUser(user));
    const url = sessionStorage.getItem('url');
    if (url == '/auth') {
      if (user.role !== Role.Client) {
        this.router.navigateByUrl('app/management-panel/order-list-client');
      } else {
        this.router.navigateByUrl('app/ordering-panel/browse-icecream');
      }
    } else {
      //  TODO :/
      this.router.navigateByUrl(url!);
    }
  }

  public signIn(form: LoginFormValue) {
    setPersistence(getAuth(), browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(getAuth(), form.email, form.password)
        .then(async userCredential => {
          await this.getUserFromDB(userCredential.user.uid);
        })
        .catch(() => {
          this.loginFail.next(true);
          setTimeout(() => {
            this.loginFail.next(false);
          }, 2500);
        });
    });
  }

  private async getUserFromDB(uid: string) {
    const docSnap = await getDoc(doc(getFirestore(), 'users', uid));
    const user = docSnap.data() as UserType;
    sessionStorage.setItem('user', JSON.stringify(user));
    this.setStateAfterAuth(user);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public signOut() {
    signOut(getAuth());
    this.store.dispatch(AuthActions.setUnAuth());
    this.store.dispatch(UserActions.signOutCurrentUser());
    sessionStorage.removeItem('user');
    this.router.navigate(['auth']);
  }
}
