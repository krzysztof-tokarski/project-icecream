import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, ViewChild, ɵɵsetComponentScope } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, getFirestore } from '@angular/fire/firestore';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { Order } from '@shared/models/order/order.interface';
import { Client } from '@shared/models/user/client.interface';
import { Seller } from '@shared/models/user/seller.interface';
import { AppState } from '@state/app.state';
import { Observable, take } from 'rxjs';
import { NewOrderFormGeneratorService } from '../new-order-form/new-order-form-generator.service';
import { NewOrderProcessorService } from '../new-order-form/new-order-processor.service';

@Component({
  selector: 'icy-copy-last-order',
  templateUrl: './copy-last-order.component.html',
  styleUrls: ['./copy-last-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyLastOrderComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form: FormGroup = this.newOrderFormGeneratorService.createForm();
  public currentClient$!: Observable<Client>;

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
      });
  }

  public onSubmit() {
    this.currentClient$.pipe(take(1)).subscribe(client => {
      if (client.lastOrder) {
        this.newOrderProcessorService.processOrder(client.lastOrder);
        this.router.navigate(['app']);
      }
    });
  }
}
