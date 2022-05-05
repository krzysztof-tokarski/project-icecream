import { Client } from '@shared/models/user/client.interface';
import { Observable } from 'rxjs';
import { UserType } from '@shared/models/user/user.type';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { User } from 'firebase/auth';
import moment from 'moment';

@Component({
  selector: 'icy-ordering-panel',
  templateUrl: './ordering-panel.component.html',
  styleUrls: ['./ordering-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderingPanelComponent {
  public block!: boolean;

  constructor(private store: Store<AppState>) {
    const selectUser = (state: AppState) => state.user.currentUser;

    this.store.select(selectUser).subscribe(user => {
      const x = user as Client;
      const currentDate = moment(new Date()).format('YYYY.MM.DD');

      console.log(x.lastOrder?.date);
      console.log(currentDate);

      if (x.lastOrder?.date == currentDate || x.lastOrder == undefined) {
        this.block = true;
      } else {
        this.block = false;
      }
    });
  }
}
