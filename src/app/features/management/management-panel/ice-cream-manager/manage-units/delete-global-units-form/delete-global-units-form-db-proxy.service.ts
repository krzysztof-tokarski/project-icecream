import { DeleteGlobalUnitsFormInterface } from './delete-global-units-form-interface';
import { Injectable } from '@angular/core';
import { AppState } from '@state/app.state';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { collection } from 'firebase/firestore';
import { collectionData, deleteDoc, doc, Firestore, getFirestore } from '@angular/fire/firestore';
import { Unit } from '@shared/models/ice-cream/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class DeleteGlobalUnitsFormDbProxyService {
  public failSubject = new BehaviorSubject<string>('none');
  public winSubject = new BehaviorSubject<string>('none');

  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public onSubmit(form: DeleteGlobalUnitsFormInterface) {
    const selectUser = (state: AppState) => state.user.currentUser;
    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe(async user => {
        form.name = form.name.trim().toUpperCase();
        const collectionRef = collection(this.firestore, `users/${user?.uid}/unitList`);
        const unitList = collectionData(collectionRef) as Observable<Unit[]>;

        unitList.pipe(take(1)).subscribe(unitList => {
          const filteredUnit = unitList.filter(unit => unit.name == form.name);

          if (filteredUnit.length === 0) {
            this.failSubject.next(form.name);
          } else {
            const docRef = doc(getFirestore(), `users/${user?.uid}/unitList/${filteredUnit[0].unitId}`);
            this.winSubject.next(form.name);
            deleteDoc(docRef);
          }
        });
      });
  }
}
