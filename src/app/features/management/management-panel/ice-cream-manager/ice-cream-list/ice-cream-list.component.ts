import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Icecream } from '@shared/types/icecream.interface';
@Component({
  selector: 'icy-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamListComponent implements OnInit {
  public icecreamList!: Icecream[];

  public async ngOnInit(): Promise<void> {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user')!);
    console.log(userFromLocalStorage);

    this.icecreamList = userFromLocalStorage.data.icecreamList;

    console.log(this.icecreamList);
  }
}
