import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppState } from '@state/app.state';
import { Observable, take } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Order } from '@shared/models/order/order.interface';
import moment from 'moment';
import { Seller } from '@shared/models/user/seller.interface';
import { CollectionReference, orderBy, query } from 'firebase/firestore';

@Component({
  selector: 'icy-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit {
  public orderList$!: Observable<Order[]>;
  private collectionRef!: CollectionReference;

  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public ngOnInit(): void {
    const selectSeller = (state: AppState) => state.user.currentUser as Seller;
    this.store
      .select(selectSeller)
      .pipe(take(1))
      .subscribe(seller => {
        const currentDate = moment(new Date()).format('DD.MM.YYYY');
        this.collectionRef = collection(this.firestore, `orders/${seller?.uid}`, currentDate);
        const sort = query(this.collectionRef, orderBy('icecream.name', 'asc'));
        this.orderList$ = collectionData(sort) as Observable<Order[]>;
      });
  }
}
