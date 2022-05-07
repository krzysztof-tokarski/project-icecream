import { Seller } from '@shared/models/user/seller.interface';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AddIcecreamFormInterface } from './add-ice-cream-form.interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { take } from 'rxjs';
import { doc, Firestore, getFirestore, setDoc } from '@angular/fire/firestore';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');
@Injectable({
  providedIn: 'root',
})
export class AddIcecreamFormDbProxyService {
  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public async addIcecream(form: AddIcecreamFormInterface) {
    const selectUid = (state: AppState) => state.user.currentUser as Seller;
    const originalId: string = generateUniqueId({
      length: 28,
      useLetters: true,
    });

    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(async seller => {
        const newIcecream: Icecream = {
          icecreamId: originalId,
          name: form.name,
          sellerUid: seller.uid,
        };

        setDoc(doc(getFirestore(), 'users', seller.uid, 'icecreamList', originalId), newIcecream);
      });
  }
}
