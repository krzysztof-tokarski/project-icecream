import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginFormGeneratorService {
  constructor(private formBuilder: FormBuilder) {}

  public createForm() {
    const form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
    });

    return form;
  }
}
