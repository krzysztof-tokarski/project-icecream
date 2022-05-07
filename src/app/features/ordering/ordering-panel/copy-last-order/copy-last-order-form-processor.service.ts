import { Seller } from '@shared/models/user/seller.interface';
import { Order } from '@shared/models/order/order.interface';
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
    const currentDate = moment(new Date()).format('YYYY.MM.DD');
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

    setDoc(doc(getFirestore(), 'orders', lastOrder.sellerUid, currentDate, originalId), newOrder);
  }
}
