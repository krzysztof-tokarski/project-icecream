/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnInit, ComponentFactoryResolver } from '@angular/core';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { child, get, getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { user } from '@angular/fire/auth';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'icy-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamListComponent {
  public collection = collection(this.firestore, 'users/8JQOCItqF7fwWLVG9HAU3BvGKmt2/icecreamList');
  public icecreamList$: Observable<Icecream[]> = collectionData(this.collection) as Observable<Icecream[]>;

  constructor(private store: Store<AppState>, private firestore: Firestore) {
    // this.icecreamList$ = collectionData(this.collection) as Observable<Icecream[]>;
  }
}
