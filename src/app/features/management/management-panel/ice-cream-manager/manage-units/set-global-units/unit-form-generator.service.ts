import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

// export function numbersOnlyValidator(control: FormControl) {
//   // eslint-disable-next-line no-useless-escape
//   const regex = new RegExp('d*');
//   const check = regex.test(control.value);
//   if (check) {
//     return true;
//   } else {
//     return null;
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class UnitFormGeneratorService {
  constructor(private formBuilder: FormBuilder) {}

  public createForm() {
    const form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      value: this.formBuilder.control('', [Validators.required]),
    });

    // pattern="\d*"

    return form;
  }
}
