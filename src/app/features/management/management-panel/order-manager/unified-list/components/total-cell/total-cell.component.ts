import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'icy-total-cell',
  templateUrl: './total-cell.component.html',
  styleUrls: ['./total-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalCellComponent {
  @Input() public value!: number;
}
