import { AddClientFormValue } from './add-client-form.interface';
import { AddClientFirebaseProxyService } from './add-client-firebase-proxy.service';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AddClientFormGeneratorService } from './add-client-form-generator.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'icy-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClientFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form: FormGroup = this.addClientFormGeneratorService.createForm();

  constructor(
    private addClientFormGeneratorService: AddClientFormGeneratorService,
    private addClientFirebaseProxyService: AddClientFirebaseProxyService
  ) {}

  public onSubmit() {
    const auth = getAuth();
    const formValue: AddClientFormValue = this.form.value;
    this.addClientFirebaseProxyService.addClient(formValue, auth);
    this.formGroupDirective.resetForm();
  }
}
