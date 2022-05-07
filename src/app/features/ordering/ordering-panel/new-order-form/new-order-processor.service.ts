import { UnifiedListUnit, UnifiedListData } from '@shared/models/order/unified-list-item.interface';
import { Seller } from '@shared/models/user/seller.interface';
import { Order } from '@shared/models/order/order.interface';
import { Injectable } from '@angular/core';
import { NewOrderFormValue } from './new-order-form.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { take } from 'rxjs';
import { doc, getFirestore, getDoc, setDoc, updateDoc, DocumentReference } from 'firebase/firestore';
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

    const parsedAmount = parseInt(newOrderFormValue.amount);
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
          amount: parsedAmount,
          date: currentDate,
        };

        await updateDoc(clientRef, {
          lastOrder: newOrder,
        });

        setDoc(doc(getFirestore(), 'orders', newOrder.sellerUid, currentDate, originalId), newOrder);

        this.updateUnifiedList(newOrder, currentDate, parsedAmount, newOrderFormValue);

        // const icecreamRef = doc(
        //   getFirestore(),
        //   'icecreamProduction',
        //   newOrder.sellerUid,
        //   currentDate,
        //   newOrder.icecream.name
        // );
        // const icecreamSnap = await getDoc(icecreamRef);

        // const setRef = (await icecreamSnap.data()) as UnifiedListData;

        // if (icecreamSnap.exists()) {
        //   const cherryPick = setRef.units.filter(unit => {
        //     return unit.unitName == newOrderFormValue.unit.name;
        //   });
        //   const filtered = setRef.units.filter(unit => {
        //     return unit.unitName !== newOrderFormValue.unit.name;
        //   });

        //   if (cherryPick.length == 0) {
        //     const newUnit: UnifiedListUnit = {
        //       unitName: newOrderFormValue.unit.name,
        //       value: newOrderFormValue.unit.value,
        //       amount: parsedAmount,
        //       calculated: parsedAmount * newOrderFormValue.unit.value,
        //     };

        //     const arr = setRef.units;
        //     arr.push(newUnit);

        //     await updateDoc(icecreamRef, {
        //       icecreamName: setRef.icecreamName,
        //       units: arr,
        //     });
        //   }

        //   if (cherryPick.length == 1) {
        //     cherryPick[0].amount += parsedAmount;
        //     cherryPick[0].calculated += parsedAmount * newOrderFormValue.unit.value;
        //     filtered.push(cherryPick[0]);

        //     await updateDoc(icecreamRef, {
        //       icecreamName: setRef.icecreamName,
        //       units: setRef.units,
        //     });
        //   }
        // } else {
        //   const newEntry: UnifiedListData = {
        //     icecreamName: newOrderFormValue.icecream.name,
        //     units: [
        //       {
        //         unitName: newOrderFormValue.unit.name,
        //         value: newOrderFormValue.unit.value,
        //         amount: parsedAmount,
        //         calculated: parsedAmount * newOrderFormValue.unit.value,
        //       },
        //     ],
        //   };

        //   setDoc(
        //     doc(getFirestore(), 'icecreamProduction', newOrder.sellerUid, currentDate, newOrder.icecream.name),
        //     newEntry
        //   );
        // }
      });
  }

  private async updateUnifiedList(
    newOrder: Order,
    currentDate: string,
    parsedAmount: number,
    newOrderFormValue: NewOrderFormValue
  ) {
    const icecreamRef = doc(
      getFirestore(),
      'icecreamProduction',
      newOrder.sellerUid,
      currentDate,
      newOrder.icecream.name
    );
    const icecreamSnap = await getDoc(icecreamRef);

    const setRef = (await icecreamSnap.data()) as UnifiedListData;

    if (icecreamSnap.exists()) {
      this.updateUnifiedListData(parsedAmount, newOrderFormValue, icecreamRef, setRef);

      // const cherryPick = setRef.units.filter(unit => {
      //   return unit.unitName == newOrderFormValue.unit.name;
      // });
      // const filtered = setRef.units.filter(unit => {
      //   return unit.unitName !== newOrderFormValue.unit.name;
      // });

      // if (cherryPick.length == 0) {
      //   const newUnit: UnifiedListUnit = {
      //     unitName: newOrderFormValue.unit.name,
      //     value: newOrderFormValue.unit.value,
      //     amount: parsedAmount,
      //     calculated: parsedAmount * newOrderFormValue.unit.value,
      //   };

      //   const arr = setRef.units;
      //   arr.push(newUnit);

      //   await updateDoc(icecreamRef, {
      //     icecreamName: setRef.icecreamName,
      //     units: arr,
      //   });
      // }

      // if (cherryPick.length == 1) {
      //   cherryPick[0].amount += parsedAmount;
      //   cherryPick[0].calculated += parsedAmount * newOrderFormValue.unit.value;
      //   filtered.push(cherryPick[0]);

      //   await updateDoc(icecreamRef, {
      //     icecreamName: setRef.icecreamName,
      //     units: setRef.units,
      //   });
      // }
    } else {
      this.createNewUnifiedListData(newOrderFormValue, parsedAmount, currentDate, newOrder);
      // const newEntry: UnifiedListData = {
      //   icecreamName: newOrderFormValue.icecream.name,
      //   units: [
      //     {
      //       unitName: newOrderFormValue.unit.name,
      //       value: newOrderFormValue.unit.value,
      //       amount: parsedAmount,
      //       calculated: parsedAmount * newOrderFormValue.unit.value,
      //     },
      //   ],
      // };

      // setDoc(
      //   doc(getFirestore(), 'icecreamProduction', newOrder.sellerUid, currentDate, newOrder.icecream.name),
      //   newEntry
      // );
    }
  }

  private async updateUnifiedListData(
    parsedAmount: number,
    newOrderFormValue: NewOrderFormValue,
    icecreamRef: DocumentReference,
    setRef: UnifiedListData
  ) {
    const cherryPick = setRef.units.filter(unit => {
      return unit.unitName == newOrderFormValue.unit.name;
    });
    const filtered = setRef.units.filter(unit => {
      return unit.unitName !== newOrderFormValue.unit.name;
    });

    if (cherryPick.length == 0) {
      const newUnit: UnifiedListUnit = {
        unitName: newOrderFormValue.unit.name,
        value: newOrderFormValue.unit.value,
        amount: parsedAmount,
        calculated: parsedAmount * newOrderFormValue.unit.value,
      };

      const arr = setRef.units;
      arr.push(newUnit);

      await updateDoc(icecreamRef, {
        icecreamName: setRef.icecreamName,
        units: arr,
      });
    }

    if (cherryPick.length == 1) {
      cherryPick[0].amount += parsedAmount;
      cherryPick[0].calculated += parsedAmount * newOrderFormValue.unit.value;
      filtered.push(cherryPick[0]);

      await updateDoc(icecreamRef, {
        icecreamName: setRef.icecreamName,
        units: setRef.units,
      });
    }
  }

  private createNewUnifiedListData(
    newOrderFormValue: NewOrderFormValue,
    parsedAmount: number,
    currentDate: string,
    newOrder: Order
  ) {
    const newEntry: UnifiedListData = {
      icecreamName: newOrderFormValue.icecream.name,
      units: [
        {
          unitName: newOrderFormValue.unit.name,
          value: newOrderFormValue.unit.value,
          amount: parsedAmount,
          calculated: parsedAmount * newOrderFormValue.unit.value,
        },
      ],
    };

    setDoc(
      doc(getFirestore(), 'icecreamProduction', newOrder.sellerUid, currentDate, newOrder.icecream.name),
      newEntry
    );
  }
}
