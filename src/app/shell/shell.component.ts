import { AuthService } from './../auth/auth.service';
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
  public auth$ = this.store.select(appState => appState.auth.isAuth);

  constructor(private store: Store<AppState>, private authService: AuthService) {}

  public signOut() {
    this.authService.signOut();
  }
}
