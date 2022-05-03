import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { AppState } from '@state/app.state';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { map } from 'rxjs';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'icy-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamListComponent implements OnInit {
  public icecreamList!: Icecream[];

  constructor(private store: Store<AppState>) {}

  public ngOnInit() {
    const collectionRef = firebase.firestore().collection('users/8JQOCItqF7fwWLVG9HAU3BvGKmt2/icecreamList');

    collectionRef.get().then(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("All data in 'books' collection", data);
      // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
    });

    // console.log(x);

    console.log('xd');
    // const selectUid: any = (state: AppState) => state.user.currentUser?.uid;
    // console.log(selectUid);
    // this.store.select(selectUid).pipe(
    //   map(selectUid => {
    //     const x = getDoc(doc(getFirestore(), 'users', selectUid, 'icecreamList'));
    //     console.log(x);
    //   })
    // );
  }
}

// map(role => canActivateRoles.includes(role)),
// tap(canActivate => {
//   if (canActivate) {
//     return;
//   }
// })
// );
