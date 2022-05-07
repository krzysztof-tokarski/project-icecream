import { DeleteIceCreamFormDbProxyService } from './delete-ice-cream-form-db-proxy.service';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { IcecreamFormGeneratorService } from '../ice-cream-form-generator.service';

@Component({
  selector: 'icy-delete-ice-cream-form',
  templateUrl: './delete-ice-cream-form.component.html',
  styleUrls: ['./delete-ice-cream-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteIcecreamFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;
  public form: FormGroup = this.icecreamFormGeneratorService.createForm();

  constructor(
    private deleteIceCreamFormDbProxyService: DeleteIceCreamFormDbProxyService,
    private icecreamFormGeneratorService: IcecreamFormGeneratorService
  ) {}

  public onSubmit() {
    this.deleteIceCreamFormDbProxyService.onSubmit(this.form.value);
    this.formGroupDirective.resetForm();
  }
}
