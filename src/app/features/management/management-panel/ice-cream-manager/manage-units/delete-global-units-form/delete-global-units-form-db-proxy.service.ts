import { DeleteGlobalUnitsFormInterface } from './delete-global-units-form-interface';
import { Injectable } from '@angular/core';
import { AppState } from '@state/app.state';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { collection } from 'firebase/firestore';
import { collectionData, deleteDoc, doc, Firestore, getFirestore } from '@angular/fire/firestore';
import { Unit } from '@shared/models/ice-cream/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class DeleteGlobalUnitsFormDbProxyService {
  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public onSubmit(form: DeleteGlobalUnitsFormInterface) {
    const selectUser = (state: AppState) => state.user.currentUser;

    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe(async user => {
        const collectionRef = collection(this.firestore, `users/${user?.uid}/unitList`);
        const unitList = collectionData(collectionRef) as Observable<Unit[]>;

        unitList.pipe(take(1)).subscribe(unitList => {
          const filteredUnit = unitList.filter(unit => unit.name == form.name);

          if (filteredUnit.length === 0) {
            alert("there's no such unit");
          } else {
            const docRef = doc(getFirestore(), `users/${user?.uid}/unitList/${filteredUnit[0].unitId}`);

            deleteDoc(docRef);
          }
        });
      });
  }
}
