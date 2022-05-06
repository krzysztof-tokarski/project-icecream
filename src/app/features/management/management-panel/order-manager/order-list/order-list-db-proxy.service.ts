// import { Injectable } from '@angular/core';
// import { collectionData } from '@angular/fire/firestore';
// import { Store } from '@ngrx/store';
// import { Order } from '@shared/models/order/order.interface';
// import { AppState } from '@state/app.state';
// import { Firestore, collection } from 'firebase/firestore';
// import moment from 'moment';
// import { take, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class OrderListDbProxyService {
//   private _orderList!: Order[];

//   constructor(private store: Store<AppState>, private firestore: Firestore) {
//     const selectUid = (state: AppState) => state.user.currentUser?.uid;

//     this.store.select(selectUid).subscribe(uid => {
//       const currentDate = moment(new Date()).format('YYYY.MM.DD');

//       const collectionRef = collection(this.firestore, `orders/${uid}`, currentDate);
//       const orderList$ = collectionData(collectionRef) as Observable<Order[]>;

//       orderList$.subscribe(orders => {
//         return (this._orderList = orders);
//       });
//     });
//   }

//   public get orderList() {
//     return this._orderList;
//   }
// }
