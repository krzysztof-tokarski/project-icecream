import { Client } from '@shared/models/user/client.interface';
import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Role } from '@shared/models/user/role.enum';
import { AppState } from '@state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddClientDbProxyService {
  constructor(private store: Store<AppState>) {}

  public async addClient(form: AddClientFormValue) {
    let sellerUid: string;
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(value => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sellerUid = value!;
      });

    createUserWithEmailAndPassword(getAuth(), form.email, form.password).then(async userCredential => {
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
    });
  }
}
