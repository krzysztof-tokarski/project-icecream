import { NewOrderFormValue } from './../new-order-form/new-order-form.interface';
import { NewOrderProcessorService } from './../new-order-form/new-order-processor.service';
import { Order } from '@shared/models/order/order.interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import moment from 'moment';
import { updateDoc } from '@angular/fire/firestore';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');

@Injectable({
  providedIn: 'root',
})
export class CopyLastOrderFormProcessorService {
  constructor(private store: Store<AppState>, private newOrderProcessorService: NewOrderProcessorService) {}

  public async processOrder(lastOrder: Order) {
    const originalId: string = generateUniqueId({
      length: 28,
      useLetters: true,
    });
    const currentDate = moment(new Date()).format('DD.MM.YYYY');
    const newOrder: Order = {
      orderId: originalId,
      clientUid: lastOrder.clientUid,
      sellerUid: lastOrder.sellerUid,
      clientDisplayName: lastOrder.clientDisplayName,
      sellerDisplayName: lastOrder.sellerDisplayName,
      icecream: lastOrder.icecream,
      unit: lastOrder.unit,
      amount: lastOrder.amount,
      date: currentDate,
    };

    const clientRef = doc(getFirestore(), 'users', lastOrder.clientUid);
    await updateDoc(clientRef, {
      lastOrder: newOrder,
    });

    const fakeForm: NewOrderFormValue = {
      icecream: newOrder.icecream,
      unit: newOrder.unit,
      amount: String(newOrder.amount),
    };

    setDoc(doc(getFirestore(), 'orders', lastOrder.sellerUid, currentDate, originalId), newOrder);

    this.newOrderProcessorService.updateUnifiedList(newOrder, currentDate, newOrder.amount, fakeForm);
  }
}
