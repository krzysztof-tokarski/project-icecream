import { Observable } from 'rxjs';
import { Client } from '@shared/models/user/client.interface';
import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Role } from '@shared/models/user/role.enum';
import { AppState } from '@state/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AddClientFirebaseProxyService {
  constructor(private store: Store<AppState>) {}

  public async addClient(form: AddClientFormValue) {
    let sellerUid: string;
    const selectUid: any = (state: AppState) => state.user.currentUser?.uid;
    // to do

    this.store.select(selectUid).subscribe(uid => (sellerUid = uid));

    // create user for firebase auth
    createUserWithEmailAndPassword(getAuth(), form.email, form.password)
      .then(async userCredential => {
        const newClient: Client = {
          uid: userCredential.user.uid,
          sellerUid: sellerUid,
          role: Role.Client,
          displayName: form.displayName,
        };

        // create new entry in the users collection
        setDoc(doc(getFirestore(), 'users', userCredential.user.uid), newClient);

        // create new entry in the seller's clientlist subcollection
        setDoc(doc(getFirestore(), 'users', sellerUid, 'clientList', userCredential.user.uid), newClient);

        const docRef = doc(getFirestore(), 'users', sellerUid);

        // update property of the seller
        await updateDoc(docRef, {
          clientList: arrayUnion(newClient),
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error adding new user to the database', errorCode, errorMessage);
      });
  }
}
