import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icy-set-global-units',
  templateUrl: './set-global-units.component.html',
  styleUrls: ['./set-global-units.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetGlobalUnitsComponent implements OnInit {
  // public units!: Unit[];

  public ngOnInit() {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user')!);
    console.log(userFromLocalStorage);

    // this.icecreamList = userFromLocalStorage.icecreamList;
  }
}
