import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'icy-management-panel',
  templateUrl: './management-panel.component.html',
  styleUrls: ['./management-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementPanelComponent implements OnInit {
  // loginForm!: FormGroup;

  // constructor(private formBuider: FormBuilder) {}

  ngOnInit(): void {}
}
