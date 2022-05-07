import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'icy-auth',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
