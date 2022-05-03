import { AddGlobalUnitsFormDbProxyService } from './add-global-units-form-db-proxy.service';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AddGlobalsUnitFormGeneratorService } from './add-global-units-form-generator.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires

@Component({
  selector: 'icy-add-global-units-form',
  templateUrl: './add-global-units-form.component.html',
  styleUrls: ['./add-global-units-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGlobalUnitsFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form: FormGroup = this.addGlobalUnitsFormGeneratorService.createForm();

  constructor(
    private addGlobalUnitsFormGeneratorService: AddGlobalsUnitFormGeneratorService,
    private addGlobalUnitsFormDbProxyService: AddGlobalUnitsFormDbProxyService
  ) {}

  public async onSubmit() {
    this.addGlobalUnitsFormDbProxyService.onSubmit(this.form.value);
    this.formGroupDirective.resetForm();
  }
}
