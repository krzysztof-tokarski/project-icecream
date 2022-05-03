import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'icy-ice-cream-manager',
  templateUrl: './ice-cream-manager.component.html',
  styleUrls: ['./ice-cream-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamManagerComponent {
  constructor(private router: Router) {}

  public changeOfRoutes() {
    sessionStorage.setItem('url', this.router.url);
  }
}
