import { AuthService } from '../auth.service';
import { LoginFormGeneratorService } from './login-form-generator.service';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { LoginFormValue } from './login-form.interface';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
@Component({
  selector: 'icy-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;
  public form: FormGroup = this.loginFormGeneratorService.createForm();
  public loginFail = this.authService.loginFailObservable;

  constructor(private loginFormGeneratorService: LoginFormGeneratorService, private authService: AuthService) {}

  public onSubmit() {
    const formValue: LoginFormValue = this.form.value;
    this.authService.signIn(formValue);
    this.formGroupDirective.resetForm();
  }
}
