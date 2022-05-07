import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icy-order-from-favourites',
  templateUrl: './order-from-favourites.component.html',
  styleUrls: ['./order-from-favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFromFavouritesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
