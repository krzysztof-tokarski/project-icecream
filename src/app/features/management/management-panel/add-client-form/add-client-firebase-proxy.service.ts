import { UserService } from './../../../../auth/user.service';
import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Role } from '@shared/models/user/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AddClientFirebaseProxyService {
  constructor(private userService: UserService) {}

  public async addClient(form: AddClientFormValue) {
    let sellerUid: string;
    this.userService.user$.subscribe(user => {
      sellerUid = user.uid;
    });
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
          clientUid: userCredential.user.uid,
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error adding new user to the database', errorCode, errorMessage);
      });
  }
}
