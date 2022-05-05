// import { Injectable } from '@angular/core';
// import { collectionData, docData, Firestore } from '@angular/fire/firestore';
// import { async } from '@firebase/util';
// import { Store } from '@ngrx/store';
// import { Icecream } from '@shared/models/ice-cream/icecream.interface';
// import { Client } from '@shared/models/user/client.interface';
// import { Seller } from '@shared/models/user/seller.interface';
// import { AppState } from '@state/app.state';
// import { collection, doc, getFirestore } from 'firebase/firestore';
// import { relativeTimeRounding } from 'moment';
// import { take, Observable } from 'rxjs';

// export interface ObservableObject {
//   seller$: Observable<Seller>;
//   icecream$: Observable<Icecream[]>;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class NewOrderFormDbProxyService {
//   constructor(private store: Store<AppState>, private firestore: Firestore) {}

//   public async grabRelevantData(): Promise<ObservableObject>{
//     const selectClient = (state: AppState) => state.user.currentUser as Client;
//     let returnValue: ObservableObject;
//     await this.store
//       .select(selectClient)
//       .pipe(take(1))
//       .subscribe(async client => {
//         const icecreamListRef = collection(this.firestore, `users/${client.sellerUid}/icecreamList`);
//         const icecream$ = collectionData(icecreamListRef) as Observable<Icecream[]>;
//         const docRef = doc(getFirestore(), 'users', client.sellerUid);
//         // update property of the seller
//         const seller$ = docData(docRef) as Observable<Seller>;
//         return returnValue = { seller$: seller$, icecream$: icecream$ } as ObservableObject;
//       }).
//     return returnValue;
//   }
// }

// // const docSnap = await getDoc(docRef);
// // if (docSnap.exists()) {
// //   this.seller = docSnap.data() as Seller;
// // }
