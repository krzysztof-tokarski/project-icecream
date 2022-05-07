import { Injectable } from '@angular/core';
import { deleteDoc, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { AppState } from '@state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { Client } from '@shared/models/user/client.interface';

@Injectable({
  providedIn: 'root',
})
export class FavsService {
  constructor(private store: Store<AppState>) {}

  public processClick(icecream: Icecream, add?: boolean) {
    const selectUser = (state: AppState) => state.user.currentUser as Client;
    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe(async user => {
        const docSnap = await getDoc(doc(getFirestore(), 'users', user.uid, 'favIcecreamList', icecream.icecreamId));
        if (docSnap.exists()) {
          if (add) {
            return;
          } else {
            deleteDoc(doc(getFirestore(), 'users', user.uid, 'favIcecreamList', icecream.icecreamId));
          }
        } else {
          setDoc(doc(getFirestore(), 'users', user.uid, 'favIcecreamList', icecream.icecreamId), icecream);
        }
      });
  }
}
