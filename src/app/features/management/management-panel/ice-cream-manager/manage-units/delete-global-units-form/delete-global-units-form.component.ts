import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { skip, Subscription } from 'rxjs';
import { DeleteGlobalUnitsFormDbProxyService } from './delete-global-units-form-db-proxy.service';
import { DeleteGlobalUnitsFormGeneratorService } from './delete-global-units-form-generator.service';

@Component({
  selector: 'icy-delete-global-units-form',
  templateUrl: './delete-global-units-form.component.html',
  styleUrls: ['./delete-global-units-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteGlobalUnitsFormComponent implements OnDestroy {
  @ViewChild(FormGroupDirective) private formGroupDirective!: FormGroupDirective;
  public form: FormGroup = this.deleteGlobalUnitsFormGeneratorService.createForm();
  private unit!: string;
  private failSubscription!: Subscription;
  private winSubscription!: Subscription;

  constructor(
    private deleteGlobalUnitsFormGeneratorService: DeleteGlobalUnitsFormGeneratorService,
    private deleteGlobalUnitsFormDbProxyService: DeleteGlobalUnitsFormDbProxyService,
    private snackBar: MatSnackBar
  ) {
    this.failSubscription = this.deleteGlobalUnitsFormDbProxyService.failSubject.pipe(skip(1)).subscribe(value => {
      this.unit = value;
      this.openSnackFail();
    });
    this.winSubscription = this.deleteGlobalUnitsFormDbProxyService.winSubject.pipe(skip(1)).subscribe(value => {
      this.unit = value;
      this.openSnackWin();
    });
  }

  public async onSubmit() {
    this.deleteGlobalUnitsFormDbProxyService.onSubmit(this.form.value);
    this.formGroupDirective.resetForm();
  }

  public openSnackFail() {
    this.snackBar.open(`${this.unit} failed to be deleted! Perhaps it didn't exist in the first place...`);
  }

  public openSnackWin() {
    this.snackBar.open(`${this.unit} was deleted!`);
  }

  public ngOnDestroy(): void {
    this.failSubscription.unsubscribe();
    this.winSubscription.unsubscribe();
  }
}
