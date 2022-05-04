import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icy-favourite-ice-cream-list',
  templateUrl: './favourite-ice-cream-list.component.html',
  styleUrls: ['./favourite-ice-cream-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouriteIceCreamListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
