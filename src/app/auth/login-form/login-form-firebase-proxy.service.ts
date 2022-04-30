import { LoginFormValue } from './login-form.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginFormFirebaseProxyService {
  public async logIn(form: LoginFormValue) {
    try {
      // await addDoc(collection(getFirestore(), 'users'), {
      //   email: form.email,
      //   password: form.password,
      //   role: Role.Client,
      //   timestamp: serverTimestamp(),
      // });
    } catch (error) {
      // console.error('Error writing new message to Firebase Database', error);
    }
  }
}
