import { AddGlobalUnitsFormDbProxyService } from './add-global-units-form-db-proxy.service';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, ChangeDetectionStrategy, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { AddGlobalsUnitFormGeneratorService } from './add-global-units-form-generator.service';
import { skip, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

// eslint-disable-next-line @typescript-eslint/no-var-requires

@Component({
  selector: 'icy-add-global-units-form',
  templateUrl: './add-global-units-form.component.html',
  styleUrls: ['./add-global-units-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGlobalUnitsFormComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;
  public form: FormGroup = this.addGlobalUnitsFormGeneratorService.createForm();
  private failSubscription!: Subscription;
  private winSubscription!: Subscription;
  private unit!: string;

  constructor(
    private addGlobalUnitsFormGeneratorService: AddGlobalsUnitFormGeneratorService,
    private addGlobalUnitsFormDbProxyService: AddGlobalUnitsFormDbProxyService,
    private snackBar: MatSnackBar
  ) {}

  public async onSubmit() {
    this.addGlobalUnitsFormDbProxyService.onSubmit(this.form.value);
    this.formGroupDirective.resetForm();
  }

  public ngOnInit(): void {
    this.failSubscription = this.addGlobalUnitsFormDbProxyService.failSubject.pipe(skip(1)).subscribe(value => {
      this.unit = value;
      this.openSnackFail();
    });
    this.winSubscription = this.addGlobalUnitsFormDbProxyService.winSubject.pipe(skip(1)).subscribe(value => {
      this.unit = value;
      this.openSnackWin();
    });
  }

  public openSnackFail() {
    this.snackBar.open(`${this.unit} failed to be added! Perhaps there already is a Unit with such name`);
  }

  public openSnackWin() {
    this.snackBar.open(`${this.unit} was added!`);
  }

  public ngOnDestroy(): void {
    this.failSubscription.unsubscribe();
    this.winSubscription.unsubscribe();
  }
}
