import { AddIceCreamFormGeneratorService } from './add-ice-cream-form-generator.service';
import { FormControl, FormGroup } from '@angular/forms';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icecream } from '@shared/types/icecream.interface';

@Component({
  selector: 'icy-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IceCreamListComponent implements OnInit {
  public form!: FormGroup;
  public icecreamList!: Icecream[];

  constructor(private addIceCreamFormGeneratorService: AddIceCreamFormGeneratorService) {
    this.form = this.addIceCreamFormGeneratorService.createForm();
  }

  public async ngOnInit(): Promise<void> {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user')!);
    console.log(userFromLocalStorage);

    this.icecreamList = userFromLocalStorage.data.icecreamList;

    console.log(this.icecreamList);
  }

  public onSubmit() {
    console.log('xD');
  }
}
