import { Seller } from '@shared/models/user/seller.interface';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '@state/app.state';
import { take } from 'rxjs';
import { Unit } from '@shared/models/ice-cream/unit.interface';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { AddGlobalUnitsFormInterface } from './add-global-units-form-interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');

@Injectable({
  providedIn: 'root',
})
export class AddGlobalUnitsFormDbProxyService {
  constructor(private store: Store<AppState>) {}

  public onSubmit(form: AddGlobalUnitsFormInterface) {
    const selectUser = (state: AppState) => state.user.currentUser as Seller;

    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe(seller => {
        const originalId: string = generateUniqueId({
          length: 28,
          useLetters: true,
        });

        const newUnit: Unit = {
          name: form.name,
          value: form.value,
          unitId: originalId,
          sellerUid: seller.uid,
        };

        setDoc(doc(getFirestore(), 'users', seller.uid, 'unitList', originalId), newUnit);
      });
  }
}
