import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';
import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { CollectionReference, orderBy, query } from 'firebase/firestore';

@Component({
  selector: 'icy-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamListComponent {
  public icecreamList$!: Observable<Icecream[]>;
  private collectionRef!: CollectionReference;
  private nameSort = 'asc';

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        this.collectionRef = collection(this.firestore, `users/${uid}/icecreamList`);
        this.icecreamList$ = collectionData(this.collectionRef) as Observable<Icecream[]>;
      });
  }

  public sortByName() {
    let sort;
    if (this.nameSort == 'asc') {
      sort = query(this.collectionRef, orderBy('name', 'desc'));
      this.nameSort = 'desc';
    } else {
      sort = query(this.collectionRef, orderBy('name', 'asc'));
      this.nameSort = 'asc';
    }
    this.icecreamList$ = collectionData(sort) as Observable<Icecream[]>;
  }
}
