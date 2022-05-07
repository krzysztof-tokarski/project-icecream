import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';

import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
@Component({
  selector: 'icy-favourite-ice-cream-list',
  templateUrl: './favourite-ice-cream-list.component.html',
  styleUrls: ['./favourite-ice-cream-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouriteIceCreamListComponent {
  public icecreamList$!: Observable<Icecream[]>;

  constructor(private store: Store<AppState>, private firestore: Firestore, private snackbar: MatSnackBar) {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;

    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        const collectionRef = collection(this.firestore, `users/${uid}/favIcecreamList`);
        this.icecreamList$ = collectionData(collectionRef) as Observable<Icecream[]>;
      });
  }

  public openSnackBar(icecreamName: string) {
    this.snackbar.open(`${icecreamName} is no longer your favourite :(`);
  }
}
