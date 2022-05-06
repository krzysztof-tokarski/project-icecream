import { Unit } from '@shared/models/ice-cream/unit.interface';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@state/app.state';

import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'icy-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent {
  public unitList$!: Observable<Unit[]>;

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    // to do
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        const collectionRef = collection(this.firestore, `users/${uid}/unitList`);
        this.unitList$ = collectionData(collectionRef) as Observable<Unit[]>;
      });
  }
}
