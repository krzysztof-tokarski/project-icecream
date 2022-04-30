import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icy-ordering-panel',
  templateUrl: './ordering-panel.component.html',
  styleUrls: ['./ordering-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderingPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
