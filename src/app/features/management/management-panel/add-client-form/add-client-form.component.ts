import { AddClientFormValue } from './add-client-form.interface';
import { AddClientFirebaseProxyService } from './add-client-firebase-proxy.service';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AddClientFormGeneratorService } from './add-client-form-generator.service';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { Role } from '@features/management/types/role.enum';

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
    const formValue: AddClientFormValue = this.form.value;
    this.addClientFirebaseProxyService.addClient(formValue);
    this.formGroupDirective.resetForm();
  }
}
