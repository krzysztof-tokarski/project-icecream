import { Seller } from '@shared/models/user/seller.interface';
import { getDoc } from 'firebase/firestore';
import { Client } from '@shared/models/user/client.interface';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Store, select } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';

import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection, doc, getFirestore } from '@angular/fire/firestore';
import { state } from '@angular/animations';
@Component({
  selector: 'icy-icecream-browser',
  templateUrl: './icecream-browser.component.html',
  styleUrls: ['./icecream-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcecreamBrowserComponent {
  public icecreamList$!: Observable<Icecream[]>;
  public seller!: Seller;

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectClient = (state: AppState) => state.user.currentUser as Client;

    this.store
      .select(selectClient)
      .pipe(take(1))
      .subscribe(async client => {
        const icecreamListRef = collection(this.firestore, `users/${client.sellerUid}/icecreamList`);
        this.icecreamList$ = collectionData(icecreamListRef) as Observable<Icecream[]>;
        const docRef = doc(getFirestore(), 'users', client.sellerUid);
        // update property of the seller
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.seller = docSnap.data() as Seller;
        }
      });
  }
}
