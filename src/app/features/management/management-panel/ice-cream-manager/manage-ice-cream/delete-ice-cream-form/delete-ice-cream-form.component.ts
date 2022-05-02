import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { arrayRemove, arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { IceCreamFormGeneratorService } from '../ice-cream-form-generator.service';

@Component({
  selector: 'icy-delete-ice-cream-form',
  templateUrl: './delete-ice-cream-form.component.html',
  styleUrls: ['./delete-ice-cream-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteIceCreamFormComponent {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form!: FormGroup;

  constructor(private iceCreamFormGeneratorService: IceCreamFormGeneratorService) {
    this.form = this.iceCreamFormGeneratorService.createForm();
  }

  public async onSubmit() {
    const deletedIcecream: Icecream = {
      name: this.form.controls['name'].value,
      units: [],
      sellerUid: '',
      id: '',
    };

    const docRef = doc(getFirestore(), 'sellers', '8JQOCItqF7fwWLVG9HAU3BvGKmt2');

    await updateDoc(docRef, {
      icecreamList: arrayRemove(deletedIcecream),
    });

    this.formGroupDirective.resetForm();
  }
}
