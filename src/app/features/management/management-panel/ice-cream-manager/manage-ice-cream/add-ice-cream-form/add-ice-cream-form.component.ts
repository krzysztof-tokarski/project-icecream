import { MatSnackBar } from '@angular/material/snack-bar';
import { AddIcecreamFormDbProxyService } from './add-ice-cream-form-db-proxy.service';
import { Component, ChangeDetectionStrategy, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { AddIcecreamFormInterface } from './add-ice-cream-form.interface';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { IcecreamFormGeneratorService } from '../ice-cream-form-generator.service';
import { skip, Subscription } from 'rxjs';
@Component({
  selector: 'icy-add-ice-cream-form',
  templateUrl: './add-ice-cream-form.component.html',
  styleUrls: ['./add-ice-cream-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIcecreamFormComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;
  public form: FormGroup = this.icecreamFormGeneratorService.createForm();
  private failSubscription!: Subscription;
  private winSubscription!: Subscription;
  private icecream!: string;

  constructor(
    private icecreamFormGeneratorService: IcecreamFormGeneratorService,
    private addIcecreamFormDbProxyService: AddIcecreamFormDbProxyService,
    private snackBar: MatSnackBar
  ) {}

  public onSubmit() {
    const formValue: AddIcecreamFormInterface = this.form.value;
    this.addIcecreamFormDbProxyService.addIcecream(formValue);
    this.formGroupDirective.resetForm();
  }

  public ngOnInit(): void {
    this.failSubscription = this.addIcecreamFormDbProxyService.failSubject.pipe(skip(1)).subscribe(value => {
      this.icecream = value;
      this.openSnackFail();
    });
    this.winSubscription = this.addIcecreamFormDbProxyService.winSubject.pipe(skip(1)).subscribe(value => {
      this.icecream = value;
      this.openSnackWin();
    });
  }

  public openSnackFail() {
    this.snackBar.open(`${this.icecream} failed to be added! Perhaps there already is an Ice Cream with such name`);
  }

  public openSnackWin() {
    this.snackBar.open(`${this.icecream} was added!`);
  }

  public ngOnDestroy(): void {
    this.failSubscription.unsubscribe();
    this.winSubscription.unsubscribe();
  }
}
