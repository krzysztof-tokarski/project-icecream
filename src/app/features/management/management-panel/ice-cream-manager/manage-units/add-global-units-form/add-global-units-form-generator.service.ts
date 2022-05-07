import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class AddGlobalsUnitFormGeneratorService {
  constructor(private formBuilder: FormBuilder) {}

  public createForm() {
    const form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      value: this.formBuilder.control('', [Validators.required]),
    });
    return form;
  }
}
