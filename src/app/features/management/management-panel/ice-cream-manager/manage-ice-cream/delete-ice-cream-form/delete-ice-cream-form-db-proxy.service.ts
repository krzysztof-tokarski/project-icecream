import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

import { map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteIceCreamFormDbProxyService {
  public icecreamList$!: Observable<Icecream[]>;

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        const collectionRef = collection(this.firestore, `users/${uid}/icecreamList`);
        this.icecreamList$ = collectionData(collectionRef) as Observable<Icecream[]>;
      });
  }

  public async onSubmit(form: FormGroup) {
    let originalArray!: Icecream[];
    const deletedIcecream = form.controls['name'].value;
    this.icecreamList$
      .pipe(
        map(icecream => {
          originalArray = icecream;
          return icecream.filter(icecream => icecream.name !== deletedIcecream);
        })
      )
      .pipe(take(1))
      .subscribe(async filteredIcecream => {
        // to do - which approach is better?
        const difference = originalArray.filter(x => !filteredIcecream.includes(x)) as Icecream[];
        if (difference.length == 0) {
          //  to do
        } else {
          const selectUid: any = (state: AppState) => state.user.currentUser?.uid;
          // to do
          this.store
            .select(selectUid)
            .pipe(take(1))
            .subscribe(async sellerUid => {
              let docRef = doc(getFirestore(), 'users', sellerUid);
              // update prop of the seller
              updateDoc(docRef, {
                icecreamList: filteredIcecream,
              });

              // update subcollection
              docRef = doc(getFirestore(), 'users', sellerUid, 'icecreamList', difference[0].icecreamId as string);
              deleteDoc(docRef);

              // update icecream col
              docRef = doc(getFirestore(), 'icecream', difference[0].icecreamId as string);
              deleteDoc(docRef);
            });
        }
      });
  }
}
