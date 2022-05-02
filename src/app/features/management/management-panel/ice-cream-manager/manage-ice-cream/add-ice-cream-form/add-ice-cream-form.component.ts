import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { IceCreamFormGeneratorService } from '../ice-cream-form-generator.service';

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
    const newIceCream: Icecream = {
      name: this.form.controls['name'].value,
      units: [],
    };

    const docRef = doc(getFirestore(), 'sellers', '8JQOCItqF7fwWLVG9HAU3BvGKmt2');

    await updateDoc(docRef, {
      icecreamList: arrayUnion(newIceCream),
    });

    this.formGroupDirective.resetForm();
  }
}
