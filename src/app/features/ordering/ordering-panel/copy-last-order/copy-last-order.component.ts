import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Client } from '@shared/models/user/client.interface';

import { AppState } from '@state/app.state';
import { Observable, take } from 'rxjs';
import { NewOrderFormGeneratorService } from '../new-order-form/new-order-form-generator.service';
import { NewOrderProcessorService } from '../new-order-form/new-order-processor.service';
import moment from 'moment';

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
          if (client.lastOrder?.date === moment(new Date()).format('DD.MM.YYYY')) {
            this.alreadyOrdered = true;
          }
        });
      });
  }

  public onSubmit() {
    this.currentClient$.pipe(take(1)).subscribe(client => {
      if (client.lastOrder) {
        // this.newOrderProcessorService.processOrder(client.lastOrder);
        this.router.navigate(['app']);
      }
    });
  }
}
