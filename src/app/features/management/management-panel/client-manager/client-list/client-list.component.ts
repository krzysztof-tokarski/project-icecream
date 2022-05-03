import { Client } from '@shared/models/user/client.interface';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@state/app.state';

import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'icy-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {
  public clientList$!: Observable<Client[]>;

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    // to do
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        const collectionRef = collection(this.firestore, `users/${uid}/clientList`);
        this.clientList$ = collectionData(collectionRef) as Observable<Client[]>;
      });
  }
}
