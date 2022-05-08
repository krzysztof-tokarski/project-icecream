import { FavsService } from './favs.service';
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
  @Input() public add!: boolean;

  constructor(private favsService: FavsService) {}

  public onClick() {
    this.favsService.processClick(this.icecream, this.add);
  }
}
