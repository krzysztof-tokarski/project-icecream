import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icy-copy-last-order',
  templateUrl: './copy-last-order.component.html',
  styleUrls: ['./copy-last-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyLastOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
