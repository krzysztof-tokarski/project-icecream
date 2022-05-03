import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '@state/app.state';
import { take } from 'rxjs';
import { Unit } from '@shared/models/ice-cream/unit.interface';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { AddGlobalUnitsFormInterface } from './add-global-units-form-interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');

@Injectable({
  providedIn: 'root',
})
export class AddGlobalUnitsFormDbProxyService {
  constructor(private store: Store<AppState>) {}

  public onSubmit(form: AddGlobalUnitsFormInterface) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const selectUid: any = (state: AppState) => state.user.currentUser?.uid;
    // to do

    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(async sellerUid => {
        const originalId = generateUniqueId({
          length: 28,
          useLetters: true,
        });

        const newUnit: Unit = {
          name: form.name,
          value: form.value,
          unitId: originalId,
          sellerUid: sellerUid,
        };

        // create new entry in the unit collection
        setDoc(doc(getFirestore(), 'unit', originalId), newUnit);

        // create new entry in the seller's unit subcollection
        setDoc(doc(getFirestore(), 'users', sellerUid, 'unitList', originalId), newUnit);

        const docRef = doc(getFirestore(), 'users', sellerUid);

        // update prop of the seller
        await updateDoc(docRef, {
          unitList: arrayUnion(newUnit),
        }).catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error adding new unit to the database', errorCode, errorMessage);
        });
      });
  }
}
