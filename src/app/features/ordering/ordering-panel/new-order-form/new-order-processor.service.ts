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

    const currentDate = moment(new Date()).format('DD.MM.YYYY');

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
          clientUid: client.uid,
          sellerUid: seller.uid,
          clientDisplayName: client.displayName,
          sellerDisplayName: seller.displayName,
          icecream: newOrderFormValue.icecream,
          unit: newOrderFormValue.unit,
          amount: newOrderFormValue.amount,
          date: currentDate,
        };

        await updateDoc(clientRef, {
          lastOrder: newOrder,
        });

        setDoc(doc(getFirestore(), 'orders', newOrder.sellerUid, currentDate, originalId), newOrder);
        const icecreamRef = doc(
          getFirestore(),
          'icecreamProduction',
          newOrder.sellerUid,
          currentDate,
          newOrder.icecream.name
        );
        const icecreamSnap = await getDoc(icecreamRef);

        const icecreamValues = {
          newOrder: [newOrderFormValue.unit],
          amount: [newOrderFormValue.amount],
        };

        if (icecreamSnap.exists()) {
          console.log('exists');

          await updateDoc(icecreamRef, {
            [newOrder.unit.name]: arrayUnion(newOrderFormValue.amount),
          });
        } else {
          const newEntry = {
            [newOrder.unit.name]: [newOrderFormValue.amount],
          };

          setDoc(
            doc(getFirestore(), 'icecreamProduction', newOrder.sellerUid, currentDate, newOrder.icecream.name),
            newEntry
          );
        }

        // setDoc(
        //   doc(
        //     getFirestore(),
        //     'orders',
        //     seller.uid,
        //     currentDate,
        //     newOrder.icecream.name,
        //     newOrder.client.uid,
        //     newOrder.orderId
        //   ),
        //   newOrder
        // );

        // setDoc(doc(getFirestore(), 'users', seller.uid, 'orderList', originalId), newOrder);
        // setDoc(doc(getFirestore(), 'users', client.uid, 'orderList', originalId), newOrder);
      });
  }
}
