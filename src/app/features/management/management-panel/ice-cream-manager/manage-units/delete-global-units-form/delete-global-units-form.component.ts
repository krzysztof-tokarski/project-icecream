import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { DeleteGlobalUnitsFormDbProxyService } from './delete-global-units-form-db-proxy.service';
import { DeleteGlobalUnitsFormGeneratorService } from './delete-global-units-form-generator.service';

@Component({
  selector: 'icy-delete-global-units-form',
  templateUrl: './delete-global-units-form.component.html',
  styleUrls: ['./delete-global-units-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteGlobalUnitsFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form: FormGroup = this.deleteGlobalUnitsFormGeneratorService.createForm();

  constructor(
    private deleteGlobalUnitsFormGeneratorService: DeleteGlobalUnitsFormGeneratorService,
    private deleteGlobalUnitsFormDbProxyService: DeleteGlobalUnitsFormDbProxyService
  ) {}

  public async onSubmit() {
    this.deleteGlobalUnitsFormDbProxyService.onSubmit(this.form.value);
    this.formGroupDirective.resetForm();
  }
}
