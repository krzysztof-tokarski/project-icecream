import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ManagementPanelComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementPanelComponent,
      },
    ]),
  ],
})
export class ManagementModule {}
