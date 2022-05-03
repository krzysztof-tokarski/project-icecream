/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Icecream } from '@shared/models/ice-cream/icecream.interface';
import { getDatabase, ref, set } from 'firebase/database';
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { IceCreamFormGeneratorService } from '../ice-cream-form-generator.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  constructor(
    private iceCreamFormGeneratorService: IceCreamFormGeneratorService,
    private firestore: Firestore,
    private afs: AngularFirestore
  ) {
    this.form = this.iceCreamFormGeneratorService.createForm();
  }

  public collection = collection(this.firestore, 'users/8JQOCItqF7fwWLVG9HAU3BvGKmt2/icecreamList');
  public shirtsCollection = this.afs.collection<Icecream>('users/8JQOCItqF7fwWLVG9HAU3BvGKmt2/icecreamList');

  public form!: FormGroup;

  public async onSubmit() {
    // const id = generateUniqueId({
    //   length: 28,
    //   useLetters: true,
    // });

    // setDoc(doc(getFirestore(), 'icecream', id), {
    //   sellerUid: '8JQOCItqF7fwWLVG9HAU3BvGKmt2',
    //   name: this.form.controls['name'].value,
    // });

    this.shirtsCollection.add({ name: 'item' });

    // const db = getDatabase();
    // set(ref(db, 'icecream/' + '8JQOCItqF7fwWLVG9HAU3BvGKmt2/' + id), {
    //   units: [],
    //   name: this.form.controls['name'].value,
    // });

    this.formGroupDirective.resetForm();
  }
}
