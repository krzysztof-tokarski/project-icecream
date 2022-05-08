import { Unit } from '@shared/models/ice-cream/unit.interface';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@state/app.state';
import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { CollectionReference, orderBy, OrderByDirection, query } from 'firebase/firestore';

export interface SortingCriteria {
  property: string;
  order: OrderByDirection;
}

@Component({
  selector: 'icy-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  public unitList$!: Observable<Unit[]>;
  private nameSort = 'asc';
  private orderSort = 'asc';
  private collectionRef!: CollectionReference;

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        this.collectionRef = collection(this.firestore, `users/${uid}/unitList`);
        const sort = query(this.collectionRef, orderBy('value', 'asc'));
        this.unitList$ = collectionData(sort) as Observable<Unit[]>;
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
    this.unitList$ = collectionData(sort) as Observable<Unit[]>;
  }

  public sortByValue() {
    let sort;
    if (this.orderSort == 'asc') {
      sort = query(this.collectionRef, orderBy('value', 'desc'));
      this.orderSort = 'desc';
    } else {
      sort = query(this.collectionRef, orderBy('value', 'asc'));
      this.orderSort = 'asc';
    }
    this.unitList$ = collectionData(sort) as Observable<Unit[]>;
  }
}
