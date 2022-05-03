import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';
import { filter, map, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IcecreamFormGeneratorService } from '../ice-cream-form-generator.service';
import { Firestore, collectionData, collection, deleteDoc } from '@angular/fire/firestore';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'icy-delete-ice-cream-form',
  templateUrl: './delete-ice-cream-form.component.html',
  styleUrls: ['./delete-ice-cream-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteIcecreamFormComponent {
  public icecreamList$!: Observable<Icecream[]>;

  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private firestore: Firestore,
    private icecreamFormGeneratorService: IcecreamFormGeneratorService
  ) {
    this.form = this.icecreamFormGeneratorService.createForm();
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    // to do
    this.store.select(selectUid).subscribe(uid => {
      const collectionRef = collection(this.firestore, `users/${uid}/icecreamList`);
      this.icecreamList$ = collectionData(collectionRef) as Observable<Icecream[]>;
    });
  }

  public async onSubmit() {
    let originalArray!: Icecream[];
    const deletedIcecream = this.form.controls['name'].value;
    this.icecreamList$
      .pipe(
        map(icecream => {
          originalArray = icecream;
          return icecream.filter(icecream => icecream.name !== deletedIcecream);
        })
      )
      .subscribe(async filteredIcecream => {
        // to do - which approach is better?
        const difference = originalArray.filter(x => !filteredIcecream.includes(x)) as Icecream[];
        if (difference.length == 0) {
          console.log('nothing changed');
          //  to do
        } else {
          const selectUid: any = (state: AppState) => state.user.currentUser?.uid;
          // to do
          this.store.select(selectUid).subscribe(async sellerUid => {
            let docRef = doc(getFirestore(), 'users', sellerUid);
            // update prop of the seller
            updateDoc(docRef, {
              icecreamList: filteredIcecream,
            });

            // update subcollection
            docRef = doc(getFirestore(), 'users', sellerUid, 'icecreamList', difference[0].icecreamId as string);
            deleteDoc(docRef);

            // update icecream col
            docRef = doc(getFirestore(), 'icecream', difference[0].icecreamId as string);
            deleteDoc(docRef);
          });
        }
        this.formGroupDirective.resetForm();
      });
  }
}
