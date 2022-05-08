import { Seller } from '@shared/models/user/seller.interface';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AddIcecreamFormInterface } from './add-ice-cream-form.interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { collection, collectionData, doc, Firestore, getFirestore, setDoc } from '@angular/fire/firestore';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');
@Injectable({
  providedIn: 'root',
})
export class AddIcecreamFormDbProxyService {
  public failSubject = new BehaviorSubject<string>('none');
  public winSubject = new BehaviorSubject<string>('none');

  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public async addIcecream(form: AddIcecreamFormInterface) {
    const selectUid = (state: AppState) => state.user.currentUser as Seller;
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(async seller => {
        form.name = form.name.trim().toUpperCase();
        const collectionRef = collection(this.firestore, `users/${seller.uid}/icecreamList`);
        const icecreamList$ = collectionData(collectionRef) as Observable<Icecream[]>;
        icecreamList$.pipe(take(1)).subscribe(icecreamList => {
          const filteredIcecream = icecreamList.filter(icecream => icecream.name == form.name);
          if (filteredIcecream.length === 0) {
            this.winSubject.next(form.name);
            const originalId: string = generateUniqueId({
              length: 28,
              useLetters: true,
            });
            const newIcecream: Icecream = {
              icecreamId: originalId,
              name: form.name,
              sellerUid: seller.uid,
            };
            setDoc(doc(getFirestore(), 'users', seller.uid, 'icecreamList', originalId), newIcecream);
          } else {
            this.failSubject.next(form.name);
          }
        });
      });
  }
}
