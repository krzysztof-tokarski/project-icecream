import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AddIcecreamFormInterface } from './add-ice-cream-form.interface';
import { Injectable } from '@angular/core';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';

const generateUniqueId = require('generate-unique-id');

@Injectable({
  providedIn: 'root',
})
export class AddIcecreamFormDbProxyService {
  constructor(private store: Store<AppState>) {}

  public async addIcecream(form: AddIcecreamFormInterface) {
    const selectUid: any = (state: AppState) => state.user.currentUser?.uid;
    // to do

    this.store.select(selectUid).subscribe(async sellerUid => {
      const originalId = generateUniqueId({
        length: 28,
        useLetters: true,
      });

      const newIcecream: Icecream = {
        name: form.name,
        icecreamId: originalId,
        sellerUid: sellerUid,
      };
      // create new entry in the icecream collection
      setDoc(doc(getFirestore(), 'icecream', originalId), newIcecream);

      // create new entry in the seller's icecream subcollection
      setDoc(doc(getFirestore(), 'users', sellerUid, 'icecreamList', originalId), newIcecream);

      const docRef = doc(getFirestore(), 'users', sellerUid);

      // update prop of the seller
      await updateDoc(docRef, {
        icecreamList: arrayUnion(newIcecream),
      }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error adding new user to the database', errorCode, errorMessage);
      });
    });
  }
}
