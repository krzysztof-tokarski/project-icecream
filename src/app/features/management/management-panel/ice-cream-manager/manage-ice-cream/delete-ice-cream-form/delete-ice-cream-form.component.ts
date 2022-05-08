import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteIceCreamFormDbProxyService } from './delete-ice-cream-form-db-proxy.service';
import { Component, ChangeDetectionStrategy, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { IcecreamFormGeneratorService } from '../ice-cream-form-generator.service';
import { skip, Subscription } from 'rxjs';

@Component({
  selector: 'icy-delete-ice-cream-form',
  templateUrl: './delete-ice-cream-form.component.html',
  styleUrls: ['./delete-ice-cream-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteIcecreamFormComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;
  public form: FormGroup = this.icecreamFormGeneratorService.createForm();
  private icecream!: string;
  private failSubscription!: Subscription;
  private winSubscription!: Subscription;

  constructor(
    private deleteIceCreamFormDbProxyService: DeleteIceCreamFormDbProxyService,
    private icecreamFormGeneratorService: IcecreamFormGeneratorService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.failSubscription = this.deleteIceCreamFormDbProxyService.failSubject.pipe(skip(1)).subscribe(value => {
      this.icecream = value;
      this.openSnackFail();
    });
    this.winSubscription = this.deleteIceCreamFormDbProxyService.winSubject.pipe(skip(1)).subscribe(value => {
      this.icecream = value;
      this.openSnackWin();
    });
  }

  public onSubmit() {
    this.deleteIceCreamFormDbProxyService.onSubmit(this.form.value);
    this.formGroupDirective.resetForm();
  }

  public openSnackFail() {
    this.snackBar.open(`${this.icecream} failed to be deleted! Perhaps it didn't exist in the first place...`);
  }

  public openSnackWin() {
    this.snackBar.open(`${this.icecream} was deleted!`);
  }

  public ngOnDestroy(): void {
    this.failSubscription.unsubscribe();
    this.winSubscription.unsubscribe();
  }
}
