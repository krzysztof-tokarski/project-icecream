import { Client } from '@shared/models/user/client.interface';
import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Role } from '@shared/models/user/role.enum';
import { AppState } from '@state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Seller } from '@shared/models/user/seller.interface';

@Injectable({
  providedIn: 'root',
})
export class AddClientDbProxyService {
  constructor(private store: Store<AppState>) {}

  public async addClient(form: AddClientFormValue) {
    const selectSeller = (state: AppState) => state.user.currentUser as Seller;
    this.store
      .select(selectSeller)
      .pipe(take(1))
      .subscribe(seller => {
        createUserWithEmailAndPassword(getAuth(), form.email, form.password).then(async userCredential => {
          const newClient: Client = {
            uid: userCredential.user.uid,
            sellerUid: seller.uid,
            role: Role.Client,
            displayName: form.displayName.trim().toUpperCase(),
          };

          // create new entry in the users collection
          setDoc(doc(getFirestore(), 'users', userCredential.user.uid), newClient);

          // create new entry in the seller's clientlist subcollection
          setDoc(doc(getFirestore(), 'users', seller.uid, 'clientList', userCredential.user.uid), newClient);
        });
      });
  }
}
