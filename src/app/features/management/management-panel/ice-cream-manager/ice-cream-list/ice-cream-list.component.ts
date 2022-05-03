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
@Component({
  selector: 'icy-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamListComponent implements OnInit {
  public icecreamList!: Icecream[];

  constructor(private store: Store<AppState>) {
    async function getDB() {
      const userId = '8JQOCItqF7fwWLVG9HAU3BvGKmt2';

      const insert = 'icecream/' + userId;
      const dbRef = ref(getDatabase());

      await get(child(dbRef, insert)).then(snapshot => {
        const data = snapshot.val();
        const values = Object.keys(data).map(function (key) {
          return data[key];
        });
        return localStorage.setItem('icecream', JSON.stringify(values));
      });
    }

    getDB().then((this.icecreamList = JSON.parse(localStorage.getItem('icecream')!)));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  ngOnInit(): void {
    // async function getDB() {
    //   const userId = '8JQOCItqF7fwWLVG9HAU3BvGKmt2';
    //   const insert = 'icecream/' + userId;
    //   const dbRef = ref(getDatabase());
    //   await get(child(dbRef, insert)).then(snapshot => {
    //     const data = snapshot.val();
    //     const values = Object.keys(data).map(function (key) {
    //       return data[key];
    //     });
    //     return localStorage.setItem('icecream', JSON.stringify(values));
    //   });
    // }
    // getDB().then((this.icecreamList = JSON.parse(localStorage.getItem('icecream')!)));
  }
}
