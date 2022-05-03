import { UserService } from './../../../../auth/user.service';
import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Role } from '@shared/models/user/role.enum';
import { AppState } from '@state/app.state';
import { State, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { getDatabase, ref, set } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class AddClientFirebaseProxyService {
  constructor(private userService: UserService, private store: Store<AppState>, private httpClient: HttpClient) {}

  public async addClient(form: AddClientFormValue) {
    let sellerUid: string;
    // this.userService.user$.subscribe(user => {
    //   sellerUid = user.uid;
    // });

    const selectUid: any = (state: AppState) => state.user.currentUser?.uid;

    this.store.select(selectUid).subscribe(uid => (sellerUid = uid));

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(async userCredential => {
        setDoc(doc(getFirestore(), 'users', userCredential.user.uid), {
          sellerUid: sellerUid,
          role: Role.Client,
          displayName: form.displayName,
        });

        updateDoc(doc(getFirestore(), 'users', sellerUid), {
          clientsList: arrayUnion(userCredential.user.uid),
        });

        setDoc(doc(getFirestore(), 'users', sellerUid, 'clientList', userCredential.user.uid), {
          displayName: form.displayName,
          clientUid: userCredential.user.uid,
        });

        const db = getDatabase();
        set(ref(db, 'users/' + userCredential.user.uid), {
          sellerUid: sellerUid,
          role: Role.Client,
          displayName: form.displayName,
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error adding new user to the database', errorCode, errorMessage);
      });
  }
}
