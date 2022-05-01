import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '@state/app.state';

@Component({
  selector: 'icy-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  public user$ = this.store$.select(appState => appState.user.currentUser);
  public auth = this.store$.select(appState => appState.auth.isAuth);
  public user = this.store$.select(appState => appState.user.currentUser);

  constructor(private store$: Store<AppState>) {}
}
