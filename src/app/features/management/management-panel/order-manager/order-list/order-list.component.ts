import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Client } from '@shared/models/user/client.interface';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppState } from '@state/app.state';

import { Observable, ReplaySubject, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Order } from '@shared/models/order/order.interface';
import moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'icy-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit {
  public orderList$!: Observable<Order[]>;

  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public ngOnInit(): void {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    // to do
    this.store
      .select(selectUid)
      // .pipe(take(1))
      .subscribe(uid => {
        const currentDate = moment(new Date()).format('DD.MM.YYYY');

        const collectionRef = collection(this.firestore, `orders/${uid}`, currentDate);
        this.orderList$ = collectionData(collectionRef) as Observable<Order[]>;
      });
  }

  public pull() {
    // const selectUid = (state: AppState) => state.user.currentUser?.uid;
    // // to do
    // this.store
    //   .select(selectUid)
    //   .pipe(take(1))
    //   .subscribe(uid => {
    //     const currentDate = moment(new Date()).format('YYYY.MM.DD');
    //     const collectionRef = collection(this.firestore, `orders/${uid}`, currentDate);
    //     this.orderList$ = collectionData(collectionRef) as Observable<Order[]>;
    //     this.orderList$.subscribe(orderList => {
    //       this.dataSource = orderList as Order[];
    //     });
    //   });
  }
}
