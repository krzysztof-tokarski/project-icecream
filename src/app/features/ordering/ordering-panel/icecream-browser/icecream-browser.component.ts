import { Client } from '@shared/models/user/client.interface';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';

import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
@Component({
  selector: 'icy-icecream-browser',
  templateUrl: './icecream-browser.component.html',
  styleUrls: ['./icecream-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IcecreamBrowserComponent {
  public icecreamList$!: Observable<Icecream[]>;

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectClient = (state: AppState) => state.user.currentUser as Client;
    // to do

    this.store
      .select(selectClient)
      .pipe(take(1))
      .subscribe(uid => {
        const collectionRef = collection(this.firestore, `users/${uid}/icecreamList`);
        this.icecreamList$ = collectionData(collectionRef) as Observable<Icecream[]>;
      });
  }
}
