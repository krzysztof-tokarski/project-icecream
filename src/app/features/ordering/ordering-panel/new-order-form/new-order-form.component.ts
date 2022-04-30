import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icy-new-order-form',
  templateUrl: './new-order-form.component.html',
  styleUrls: ['./new-order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
