import { Seller } from './../../../../shared/models/user/seller.interface';
import { Order } from './../../../../shared/models/order/order.interface';
import { Injectable } from '@angular/core';
import { NewOrderFormValue } from './new-order-form.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { take } from 'rxjs';
import { doc, getFirestore, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Client } from '@shared/models/user/client.interface';
import moment from 'moment';

const generateUniqueId = require('generate-unique-id');

// moment(new Date()).format("YYYY/MM/DD");

@Injectable({
  providedIn: 'root',
})
export class NewOrderProcessorService {
  constructor(private store: Store<AppState>) {}

  public processOrder(newOrderFormValue: NewOrderFormValue) {
    const originalId: string = generateUniqueId({
      length: 28,
      useLetters: true,
    });

    const selectUser = (state: AppState) => state.user.currentUser as Client;

    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe(async user => {
        const sellerRef = doc(getFirestore(), 'users', user.sellerUid);
        const clientRef = doc(getFirestore(), 'users', user.uid);
        const seller = (await getDoc(sellerRef)).data() as Seller;
        const client = (await getDoc(clientRef)).data() as Client;

        const newOrder: Order = {
          orderId: originalId,
          client: client,
          seller: seller,
          icecream: newOrderFormValue.icecream,
          unit: newOrderFormValue.unit,
          amount: newOrderFormValue.amount,
          date: moment(new Date()).format('YYYY.MM.DD'),
        };

        setDoc(doc(getFirestore(), 'users', seller.uid, 'orderList', originalId), newOrder);
        setDoc(doc(getFirestore(), 'users', client.uid, 'orderList', originalId), newOrder);
        setDoc(doc(getFirestore(), 'orders', seller.uid, client.uid, originalId), newOrder);

        await updateDoc(sellerRef, {
          orderList: arrayUnion(newOrder),
        });
        await updateDoc(clientRef, {
          orderList: arrayUnion(newOrder),
          lastOrder: newOrder,
        });
      });
  }
}
