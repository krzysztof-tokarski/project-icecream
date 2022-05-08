import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddClientDbProxyService } from './add-client-db-proxy.service';
import { AddClientFormValue } from './add-client-form.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AddClientFormGeneratorService } from './add-client-form-generator.service';

@Component({
  selector: 'icy-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClientFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;
  public addFail = this.addClientDbProxyService.addFailObservable;
  private errorHandler: Subscription;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public form: FormGroup = this.addClientFormGeneratorService.createForm();

  constructor(
    private addClientFormGeneratorService: AddClientFormGeneratorService,
    private addClientDbProxyService: AddClientDbProxyService,
    private snackBar: MatSnackBar
  ) {
    this.errorHandler = this.addClientDbProxyService.errorHandler.subscribe(error => {
      this.showError(error);
    });
  }

  public onSubmit() {
    const formValue: AddClientFormValue = this.form.value;
    this.addClientDbProxyService.addClient(formValue);
    this.formGroupDirective.resetForm();
  }

  public showError(error: string) {
    this.snackBar.open(`The following error occured when you tried adding this new client: ${error}`);
  }
}
