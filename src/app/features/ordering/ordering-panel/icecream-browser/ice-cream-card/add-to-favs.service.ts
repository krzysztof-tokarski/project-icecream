import { Injectable } from '@angular/core';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { AppState } from '@state/app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';

@Injectable({
  providedIn: 'root',
})
export class AddToFavsService {
  constructor(private store: Store<AppState>) {}

  public addToFav(icecream: Icecream) {
    const selectUid: any = (state: AppState) => state.user.currentUser?.uid;
    // to do
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(async clientUid => {
        // add icecream to subcol of the client
        setDoc(doc(getFirestore(), 'users', clientUid, 'favIcecreamList', icecream.icecreamId!), icecream);

        const docRef = doc(getFirestore(), 'users', clientUid);

        // add icecream to prop of the client
        await updateDoc(docRef, {
          favIcecreamList: arrayUnion(icecream),
        });
      });
  }
}
