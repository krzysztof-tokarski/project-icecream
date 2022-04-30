import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
// import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Role } from '@features/management/types/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AddClientFirebaseProxyService {
  public async addClient(form: AddClientFormValue, auth: any) {
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error adding new user to the database', errorCode, errorMessage);
      });
    // try {
    //   await addDoc(collection(getFirestore(), 'users'), {
    //     email: form.email,
    //     password: form.password,
    //     role: Role.Client,
    //     timestamp: serverTimestamp(),
    //   });
    // } catch (error) {
    //   console.error('Error writing new user to Firestore', error);
    // }
  }
}
