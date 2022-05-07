import { TotalCellComponent } from './components/total-cell/total-cell.component';
import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { UnifiedListData } from '@shared/models/order/unified-list-item.interface';

@Directive({
  selector: '[icyCalculator]',
})
export class CalculatorDirective implements OnInit {
  @Input() public item!: UnifiedListData;

  constructor(private viewContainerRef: ViewContainerRef) {}

  public ngOnInit() {
    let total = 0;

    this.item.units.forEach(unit => {
      total += unit.calculated;
    });

    const component = this.viewContainerRef.createComponent(TotalCellComponent);

    component.instance.value = total;
  }
}
