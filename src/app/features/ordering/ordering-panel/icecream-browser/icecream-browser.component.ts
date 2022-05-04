import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icy-icecream-browser',
  templateUrl: './icecream-browser.component.html',
  styleUrls: ['./icecream-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IcecreamBrowserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
