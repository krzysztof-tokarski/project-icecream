import { UserService } from './../../../../auth/user.service';
import { AddClientFormValue } from './add-client-form.interface';
import { Injectable } from '@angular/core';
// import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
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
        setDoc(doc(getFirestore(), 'clients', userCredential.user.uid), {
          sellerUid: sellerUid,
          role: Role.Client,
          displayName: form.displayName,
          timestamp: serverTimestamp(),
        });

        setDoc(doc(getFirestore(), 'sellers', sellerUid, 'clientList', userCredential.user.uid), {
          clientUid: userCredential.user.uid,
        });

        // await addDoc(doc(getFirestore(), 'sellers', sellerUid, 'clientList'), {
        //   clientUid: userCredential.user.uid,
        // });

        // const docRef = doc(getFirestore(), 'sellers', sellerUid);

        // await updateDoc(docRef, {
        //   clientList: arrayUnion(userCredential.user.uid),
        // });
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error adding new user to the database', errorCode, errorMessage);
      });

    // const docSnaper = await getDoc(
    //   doc(getFirestore(), 'sellers', '8JQOCItqF7fwWLVG9HAU3BvGKmt2', 'icecreamList', 'y7Ga799GmuWFJrDEsRf2')
    // );

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
