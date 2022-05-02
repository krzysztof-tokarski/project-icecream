import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icy-ice-cream-manager',
  templateUrl: './ice-cream-manager.component.html',
  styleUrls: ['./ice-cream-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IceCreamManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
