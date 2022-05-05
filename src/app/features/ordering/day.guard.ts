import { Injectable } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Client } from '@shared/models/user/client.interface';
import { AppState } from '@state/app.state';
import moment from 'moment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentDayGuard implements CanActivate {
  constructor(private store: Store<AppState>, private firestore: Firestore, private router: Router) {}

  public canActivate(): any {
    const selectClient = (state: AppState) => state.user.currentUser as Client;

    this.store
      .select(selectClient)
      .pipe(take(1))
      .subscribe(async client => {
        const clientRef = doc(this.firestore, `users/${client.uid}`);
        const currentClient = docData(clientRef) as Observable<Client>;
        currentClient.pipe(take(1)).subscribe(client => {
          if (client.lastOrder) {
            const date = moment(new Date()).format('YYYY.MM.DD');
            if (date == client.lastOrder.date) {
              return this.router.navigateByUrl('app/ordering-panel');
            } else {
              return true;
            }
          } else {
            return this.router.navigateByUrl('app/ordering-panel');
          }
        });
      });
  }
}
