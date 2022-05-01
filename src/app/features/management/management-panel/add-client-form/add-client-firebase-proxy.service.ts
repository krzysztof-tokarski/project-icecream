import { UserService } from './../../../../auth/user.service';
import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
// import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { Role } from '@features/management/types/role.enum';

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
      .then(userCredential => {
        setDoc(doc(getFirestore(), 'clients', userCredential.user.uid), {
          sellerUid: sellerUid,
          role: Role.Client,
          displayName: form.displayName,
          favIcecreamList: [],
          orders: [],
          timestamp: serverTimestamp(),
        });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error adding new user to the database', errorCode, errorMessage);
      });

    // addDoc(collection(getFirestore(), 'users'), {
    //   // sellerUid:
    //   // email: form.email,
    //   // role: Role.Client,
    //   // displayName: 'Pan Lodziarz',
    //   // unitList: [],
    //   // icecreamList: [],
    //   // clientList: [],
    //   // timestamp: serverTimestamp(),
    // });
  }
}
