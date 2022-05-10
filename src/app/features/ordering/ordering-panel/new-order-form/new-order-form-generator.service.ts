import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NewOrderFormGeneratorService {
  constructor(private formBuilder: FormBuilder) {}

  public createForm() {
    const form = this.formBuilder.group({
      icecream: this.formBuilder.control('', [Validators.required]),
      unit: this.formBuilder.control('', [Validators.required]),
      amount: this.formBuilder.control('', [Validators.required, Validators.min(1)]),
    });

    return form;
  }
}
