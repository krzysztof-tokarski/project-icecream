import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Seller } from '@shared/models/user/seller.interface';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Unit } from '@shared/models/ice-cream/unit.interface';
import { UnitFormGeneratorService } from './unit-form-generator.service';
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const generateUniqueId = require('generate-unique-id');

@Component({
  selector: 'icy-set-global-units',
  templateUrl: './set-global-units.component.html',
  styleUrls: ['./set-global-units.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetGlobalUnitsComponent implements OnInit {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;

  public form: FormGroup = this.unitFormGeneratorService.createForm();

  constructor(private unitFormGeneratorService: UnitFormGeneratorService) {}

  public async onSubmit() {
    const newUnit: Unit = {
      name: this.form.controls['name'].value,
      value: this.form.controls['value'].value,
      sellerUid: '',
      id: generateUniqueId({
        length: 28,
        useLetters: true,
      }),
    };

    const docRef = doc(getFirestore(), 'sellers', '8JQOCItqF7fwWLVG9HAU3BvGKmt2');

    await updateDoc(docRef, {
      unitList: arrayUnion(newUnit),
    });

    this.formGroupDirective.resetForm();
  }

  // public units!: Unit[];

  public ngOnInit() {
    // const userFromsessionStorage = JSON.parse(sessionStorage.getItem('user')!) as Seller;
    // console.log(userFromsessionStorage);
    // this.units = userFromsessionStorage.unitList;
  }
}
