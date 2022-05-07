import { DeleteIcecreamFormInterface } from './delete-global-units-form-interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteIceCreamFormDbProxyService {
  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public async onSubmit(form: DeleteIcecreamFormInterface) {
    const selectUser = (state: AppState) => state.user.currentUser;

    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe(async user => {
        const collectionRef = collection(this.firestore, `users/${user?.uid}/icecreamList`);
        const icecreamList$ = collectionData(collectionRef) as Observable<Icecream[]>;

        icecreamList$.pipe(take(1)).subscribe(icecreamList => {
          const filteredIcecream = icecreamList.filter(icecream => icecream.name == form.name);

          if (filteredIcecream.length === 0) {
            alert("there's no such icecream");
          } else {
            const docRef = doc(getFirestore(), `users/${user?.uid}/icecreamList/${filteredIcecream[0].icecreamId}`);
            deleteDoc(docRef);
          }
        });
      });
  }
}
