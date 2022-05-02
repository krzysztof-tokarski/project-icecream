import { Seller } from './../shared/types/seller.interface';
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
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Role } from '@shared/types/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private store: Store<AppState>, private userService: UserService) {
    const userFromStorage: Seller | null = JSON.parse(localStorage.getItem('user') as string);

    if (!userFromStorage) {
      this.signOut();
      return;
    }

    this.setStateAfterAuth(userFromStorage);
  }

  public signIn(form: LoginFormValue) {
    signInWithEmailAndPassword(getAuth(), form.email, form.password).then(async userCredential => {
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      await this.getSeller()
        .then(() => {
          // this.store.dispatch(UserActions.signInCurrentUser(userCredential));
          const userFromStorage: Seller = JSON.parse(localStorage.getItem('user') as string);
          // to do
          console.log(userFromStorage);
          if (userFromStorage.role == Role.Seller) {
            window.location.reload();
            // todo
            this.router.navigate(['app', 'management-panel']);
          } else {
            window.location.reload();
            // todo
            this.router.navigate(['app', 'ordering-panel']);
          }
        })
        .catch(error => {
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

  private setStateAfterAuth(user: Seller | any) {
    this.userService.setUser(user);
    this.store.dispatch(AuthActions.setAuth());
    // this.store.dispatch(UserActions.signInCurrentUser(user));
    this.router.navigate(['app', 'management-panel']);
    // this.router.navigate(['app', 'ordering-panel']);
  }

  private async getSeller(uid?: string) {
    const docSnap = await getDoc(doc(getFirestore(), 'sellers', '8JQOCItqF7fwWLVG9HAU3BvGKmt2'));
    // todo

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      localStorage.setItem('user', JSON.stringify(docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }
}
