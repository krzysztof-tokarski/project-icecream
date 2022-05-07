import { FavsService } from './favs.service';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'icy-ice-cream-card',
  templateUrl: './ice-cream-card.component.html',
  styleUrls: ['./ice-cream-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamCardComponent {
  @Input() public icecream!: Icecream;
  @Input() public add!: boolean;

  constructor(private favsService: FavsService, private _snackBar: MatSnackBar) {}

  public onClick() {
    this.favsService.processClick(this.icecream, this.add);
  }
}
