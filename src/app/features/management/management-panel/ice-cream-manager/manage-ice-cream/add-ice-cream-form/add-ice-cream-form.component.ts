import { AddIcecreamFormDbProxyService } from './add-ice-cream-form-db-proxy.service';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AddIcecreamFormInterface } from './add-ice-cream-form.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { IcecreamFormGeneratorService } from '../ice-cream-form-generator.service';
@Component({
  selector: 'icy-add-ice-cream-form',
  templateUrl: './add-ice-cream-form.component.html',
  styleUrls: ['./add-ice-cream-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIcecreamFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;
  public form: FormGroup = this.icecreamFormGeneratorService.createForm();

  constructor(
    private icecreamFormGeneratorService: IcecreamFormGeneratorService,
    private addIcecreamFormDbProxyService: AddIcecreamFormDbProxyService
  ) {}

  public onSubmit() {
    const formValue: AddIcecreamFormInterface = this.form.value;
    this.addIcecreamFormDbProxyService.addIcecream(formValue);
    this.formGroupDirective.resetForm();
  }
}
