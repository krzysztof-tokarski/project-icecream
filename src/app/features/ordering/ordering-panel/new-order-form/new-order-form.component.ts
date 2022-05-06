import { NewOrderFormGeneratorService } from './new-order-form-generator.service';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { NewOrderProcessorService } from './new-order-processor.service';
import { Seller } from '@shared/models/user/seller.interface';
import { Observable, take } from 'rxjs';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { collection, collectionData, doc, docData, Firestore, getDoc, getFirestore } from '@angular/fire/firestore';
import { AppState } from '@state/app.state';
import { Client } from '@shared/models/user/client.interface';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Unit } from '@shared/models/ice-cream/unit.interface';
import { NewOrderFormValue } from './new-order-form.interface';

@Component({
  selector: 'icy-new-order-form',
  templateUrl: './new-order-form.component.html',
  styleUrls: ['./new-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form: FormGroup = this.newOrderFormGeneratorService.createForm();
  public icecreamList$!: Observable<Icecream[]>;
  public unitList$!: Observable<Unit[]>;

  constructor(
    private newOrderFormGeneratorService: NewOrderFormGeneratorService,
    private newOrderProcessorService: NewOrderProcessorService,
    private store: Store<AppState>,
    private firestore: Firestore,
    private router: Router
  ) {
    const selectClient = (state: AppState) => state.user.currentUser as Client;

    this.store
      .select(selectClient)
      .pipe(take(1))
      .subscribe(async client => {
        const icecreamListRef = collection(this.firestore, `users/${client.sellerUid}/icecreamList`);
        const unitListRef = collection(this.firestore, `users/${client.sellerUid}/unitList`);
        this.icecreamList$ = collectionData(icecreamListRef) as Observable<Icecream[]>;
        this.unitList$ = collectionData(unitListRef) as Observable<Unit[]>;
        // const docRef = doc(getFirestore(), 'users', client.sellerUid);
        // this.seller$ = docData(docRef) as Observable<Seller>;
      });
  }

  public async onSubmit() {
    const formValue: NewOrderFormValue = this.form.value;
    this.newOrderProcessorService.processOrder(formValue);
    this.formGroupDirective.resetForm();
    this.router.navigate(['app']);
  }
}
