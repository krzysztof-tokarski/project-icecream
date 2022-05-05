import { Client } from '@shared/models/user/client.interface';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@state/app.state';

import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Order } from '@shared/models/order/order.interface';
import moment from 'moment';

@Component({
  selector: 'icy-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  public orderList$!: Observable<Order[]>;

  public displayedColumns: string[] = ['orderId', 'client', 'icecream', 'unit', 'amount', 'date'];
  public dataSource!: Order[];

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;

    // to do
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        const currentDate = moment(new Date()).format('YYYY.MM.DD');

        const collectionRef = collection(this.firestore, `orders/${uid}`, currentDate);
        this.orderList$ = collectionData(collectionRef) as Observable<Order[]>;

        this.orderList$.subscribe(orderList => {
          this.dataSource = orderList as Order[];
        });
      });
  }

  public pull() {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;

    // to do
    this.store
      .select(selectUid)
      .pipe(take(1))
      .subscribe(uid => {
        const currentDate = moment(new Date()).format('YYYY.MM.DD');

        const collectionRef = collection(this.firestore, `orders/${uid}`, currentDate);
        this.orderList$ = collectionData(collectionRef) as Observable<Order[]>;

        this.orderList$.subscribe(orderList => {
          this.dataSource = orderList as Order[];
        });
      });
  }
}
