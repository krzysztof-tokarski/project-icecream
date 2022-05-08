import { Seller } from '@shared/models/user/seller.interface';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '@state/app.state';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Unit } from '@shared/models/ice-cream/unit.interface';
import { collection, collectionData, doc, Firestore, getFirestore, setDoc } from '@angular/fire/firestore';
import { AddGlobalUnitsFormInterface } from './add-global-units-form-interface';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');

@Injectable({
  providedIn: 'root',
})
export class AddGlobalUnitsFormDbProxyService {
  public failSubject = new BehaviorSubject<string>('none');
  public winSubject = new BehaviorSubject<string>('none');

  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public onSubmit(form: AddGlobalUnitsFormInterface) {
    const selectUser = (state: AppState) => state.user.currentUser as Seller;

    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe(seller => {
        form.name = form.name.trim().toUpperCase();
        const collectionRef = collection(this.firestore, `users/${seller.uid}/unitList`);
        const unitList$ = collectionData(collectionRef) as Observable<Icecream[]>;
        unitList$.pipe(take(1)).subscribe(unitList => {
          const filteredUnit = unitList.filter(unit => unit.name == form.name);
          if (filteredUnit.length === 0) {
            this.winSubject.next(form.name);
            const originalId: string = generateUniqueId({
              length: 28,
              useLetters: true,
            });
            const newUnit: Unit = {
              name: form.name,
              value: parseInt(form.value),
              unitId: originalId,
              sellerUid: seller.uid,
            };
            setDoc(doc(getFirestore(), 'users', seller.uid, 'unitList', originalId), newUnit);
          } else {
            this.failSubject.next(form.name);
          }
        });
      });
  }
}
