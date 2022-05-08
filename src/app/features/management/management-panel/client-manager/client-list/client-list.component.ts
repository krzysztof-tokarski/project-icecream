import { Client } from '@shared/models/user/client.interface';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@state/app.state';
import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { CollectionReference, orderBy, query } from 'firebase/firestore';

@Component({
  selector: 'icy-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {
  public clientList$!: Observable<Client[]>;
  private nameSort = 'asc';
  private collectionRef!: CollectionReference;

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        this.collectionRef = collection(this.firestore, `users/${uid}/clientList`);
        this.clientList$ = collectionData(this.collectionRef) as Observable<Client[]>;
      });
  }
  public sortByName() {
    let sort;
    if (this.nameSort == 'asc') {
      sort = query(this.collectionRef, orderBy('displayName', 'desc'));
      this.nameSort = 'desc';
    } else {
      sort = query(this.collectionRef, orderBy('displayName', 'asc'));
      this.nameSort = 'asc';
    }
    this.clientList$ = collectionData(sort) as Observable<Client[]>;
  }
}
