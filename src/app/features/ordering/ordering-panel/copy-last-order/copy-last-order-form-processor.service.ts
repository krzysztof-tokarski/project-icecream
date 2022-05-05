import { Seller } from './../../../../shared/models/user/seller.interface';
import { Order } from './../../../../shared/models/order/order.interface';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { take } from 'rxjs';
import { doc, getFirestore, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Client } from '@shared/models/user/client.interface';
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');

@Injectable({
  providedIn: 'root',
})
export class CopyLastOrderFormProcessorService {
  constructor(private store: Store<AppState>) {}

  public async processOrder(lastOrder: Order) {
    const originalId: string = generateUniqueId({
      length: 28,
      useLetters: true,
    });

    const sellerRef = doc(getFirestore(), 'users', lastOrder.seller.uid);
    const clientRef = doc(getFirestore(), 'users', lastOrder.client.uid);

    const newOrder: Order = {
      orderId: originalId,
      client: lastOrder.client,
      seller: lastOrder.seller,
      icecream: lastOrder.icecream,
      unit: lastOrder.unit,
      amount: lastOrder.amount,
      date: moment(new Date()).format('YYYY.MM.DD'),
    };

    setDoc(doc(getFirestore(), 'users', lastOrder.client.uid, 'orderList', originalId), newOrder);
    setDoc(doc(getFirestore(), 'users', lastOrder.seller.uid, 'orderList', originalId), newOrder);
    setDoc(doc(getFirestore(), 'orders', lastOrder.seller.uid, lastOrder.client.uid, originalId), newOrder);

    await updateDoc(sellerRef, {
      orderList: arrayUnion(newOrder),
    });
    await updateDoc(clientRef, {
      orderList: arrayUnion(newOrder),
      lastOrder: newOrder,
    });
  }
}
