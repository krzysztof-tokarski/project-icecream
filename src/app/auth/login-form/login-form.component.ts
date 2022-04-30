import { LoginFormFirebaseProxyService } from './login-form-firebase-proxy.service';
import { LoginFormGeneratorService } from './login-form-generator.service';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LoginFormValue } from './login-form.interface';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'icy-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form: FormGroup = this.loginFormGeneratorService.createForm();

  constructor(
    private loginFormGeneratorService: LoginFormGeneratorService,
    private loginFormFirebaseProxyService: LoginFormFirebaseProxyService
  ) {}

  public onSubmit() {
    const auth = getAuth();
    const formValue: LoginFormValue = this.form.value;
    this.loginFormFirebaseProxyService.signIn(formValue, auth);
    this.formGroupDirective.resetForm();
  }
}
