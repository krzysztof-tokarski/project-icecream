import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Data } from '../../../../../ordering/ordering-panel/new-order-form/new-order-processor.service';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import moment from 'moment';
import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'icy-unified-list',
  templateUrl: './unified-list.component.html',
  styleUrls: ['./unified-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnifiedListComponent implements OnInit {
  @ViewChild(MatAccordion) public accordion!: MatAccordion;

  public orderList$!: Observable<Data[]>;

  constructor(private store: Store<AppState>, private firestore: Firestore) {}

  public ngOnInit(): void {
    const selectUid = (state: AppState) => state.user.currentUser?.uid;
    // to do
    this.store
      .select(selectUid)
      // .pipe(take(1))
      .subscribe(uid => {
        const currentDate = moment(new Date()).format('DD.MM.YYYY');

        const collectionRef = collection(this.firestore, `icecreamProduction/${uid}`, currentDate);
        this.orderList$ = collectionData(collectionRef) as Observable<Data[]>;
        this.orderList$.subscribe(value => {
          console.log(value);
        });
      });
  }
}
