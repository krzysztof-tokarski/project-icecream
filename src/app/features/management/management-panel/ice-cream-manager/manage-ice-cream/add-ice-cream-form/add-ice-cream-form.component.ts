import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { IceCreamFormGeneratorService } from '../ice-cream-form-generator.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');

@Component({
  selector: 'icy-add-ice-cream-form',
  templateUrl: './add-ice-cream-form.component.html',
  styleUrls: ['./add-ice-cream-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIceCreamFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form!: FormGroup;

  constructor(private iceCreamFormGeneratorService: IceCreamFormGeneratorService) {
    this.form = this.iceCreamFormGeneratorService.createForm();
  }

  public async onSubmit() {
    const id = generateUniqueId({
      length: 28,
      useLetters: true,
    });

    setDoc(doc(getFirestore(), 'icecream', id), {
      sellerUid: '8JQOCItqF7fwWLVG9HAU3BvGKmt2',
      name: this.form.controls['name'].value,
    });

    setDoc(doc(getFirestore(), 'sellers', '8JQOCItqF7fwWLVG9HAU3BvGKmt2', 'icecreamList', id), {
      uid: id,
    });

    this.formGroupDirective.resetForm();
  }
}
