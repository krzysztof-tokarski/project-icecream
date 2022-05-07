import { NewOrderFormGeneratorService } from './new-order-form-generator.service';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { NewOrderProcessorService } from './new-order-processor.service';
import { Observable, take } from 'rxjs';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { AppState } from '@state/app.state';
import { Client } from '@shared/models/user/client.interface';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Unit } from '@shared/models/ice-cream/unit.interface';
import { NewOrderFormValue } from './new-order-form.interface';
import moment from 'moment';

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
  public currentClient$!: Observable<Client>;
  public alreadyOrdered = false;

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
        const clientRef = doc(this.firestore, `users/${client.uid}`);
        this.currentClient$ = docData(clientRef) as Observable<Client>;
        this.currentClient$.pipe(take(1)).subscribe(client => {
          if (client.lastOrder?.date !== moment(new Date()).format('DD.MM.YYYY')) {
            this.alreadyOrdered = true;
          } else {
            const icecreamListRef = collection(this.firestore, `users/${client.sellerUid}/icecreamList`);
            const unitListRef = collection(this.firestore, `users/${client.sellerUid}/unitList`);
            this.icecreamList$ = collectionData(icecreamListRef) as Observable<Icecream[]>;
            this.unitList$ = collectionData(unitListRef) as Observable<Unit[]>;
          }
        });
      });
  }

  public async onSubmit() {
    const formValue: NewOrderFormValue = this.form.value;
    this.newOrderProcessorService.processOrder(formValue);
    this.formGroupDirective.resetForm();
    this.router.navigate(['app']);
  }
}
