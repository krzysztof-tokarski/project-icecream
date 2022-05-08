import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const ANGULAR_MODULES = [FormsModule, ReactiveFormsModule];

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatSelectModule,
  MatOptionModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatExpansionModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSlideToggleModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MATERIAL_MODULES, ANGULAR_MODULES],
  exports: [MATERIAL_MODULES, ANGULAR_MODULES],
})
export class SharedModule {}
