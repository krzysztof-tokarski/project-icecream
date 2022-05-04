import { AddToFavsService } from './add-to-favs.service';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'icy-ice-cream-card',
  templateUrl: './ice-cream-card.component.html',
  styleUrls: ['./ice-cream-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamCardComponent {
  @Input() public icecream!: Icecream;

  constructor(private addToFavsService: AddToFavsService) {}

  public onClick() {
    this.addToFavsService.addToFav(this.icecream);
  }
}
