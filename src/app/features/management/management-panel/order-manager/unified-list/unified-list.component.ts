import { Seller } from '@shared/models/user/seller.interface';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { UnifiedListData } from '@shared/models/order/unified-list-item.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import moment from 'moment';
import { Observable, take } from 'rxjs';
import { CollectionReference, orderBy, query } from 'firebase/firestore';

@Component({
  selector: 'icy-unified-list',
  templateUrl: './unified-list.component.html',
  styleUrls: ['./unified-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnifiedListComponent implements OnInit {
  public orderList$!: Observable<UnifiedListData[]>;
  private collectionRef!: CollectionReference;

  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public ngOnInit(): void {
    const selectSeller = (state: AppState) => state.user.currentUser as Seller;
    this.store
      .select(selectSeller)
      .pipe(take(1))
      .subscribe(seller => {
        const currentDate = moment(new Date()).format('DD.MM.YYYY');
        this.collectionRef = collection(this.firestore, `icecreamProduction/${seller.uid}`, currentDate);
        const sort = query(this.collectionRef, orderBy('icecreamName', 'asc'));
        this.orderList$ = collectionData(sort) as Observable<UnifiedListData[]>;
      });
  }
}
