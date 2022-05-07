// import { Injectable } from '@angular/core';
// import { doc, docData, Firestore } from '@angular/fire/firestore';
// import { CanActivate, Router } from '@angular/router';
// import { Store, select } from '@ngrx/store';
// import { Client } from '@shared/models/user/client.interface';
// import { AppState } from '@state/app.state';
// import moment from 'moment';
// import { Observable, take } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class CurrentDayGuard implements CanActivate {
//   constructor(private store: Store<AppState>, private firestore: Firestore, private router: Router) {}

//   public async canActivate(): Promise<any> {
//     const selectClient = (state: AppState) => state.user.currentUser as Client;

//     await this.store
//       .select(selectClient)
//       .pipe(take(1))
//       .subscribe(client => {
//         if (client.lastOrder) {
//           const date = moment(new Date()).format('YYYY.MM.DD');
//           if (client.lastOrder.date === date) {
//             alert('1');
//             return false;
//           } else;
//           alert('2');
//           sessionStorage.setItem('')
//           return true;
//         } else {
//           alert('3');

//           this.router.navigateByUrl(this.router.url);
//           return false;
//         }
//       });
//   }
// }
