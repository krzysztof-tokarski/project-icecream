import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { Role } from '@features/management/types/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AddClientFirebaseProxyService {
  public async addClient(form: AddClientFormValue) {
    try {
      await addDoc(collection(getFirestore(), 'users'), {
        email: form.email,
        password: form.password,
        role: Role.Client,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error writing new user to Firestore', error);
    }
  }
}
