import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private router: Router) {
    // comment: hacks tor rerouting
    // this.router.events.subscribe(ev => {
    //   if (ev instanceof NavigationEnd) {
    //     sessionStorage.setItem('url', this.router.url);
    //   }
    // });
  }
}
