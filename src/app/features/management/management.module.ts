import { IceCreamListComponent } from './management-panel/ice-cream-list/ice-cream-list.component';
import { FirebaseModule } from '@shared/firebase-module/firebase.module';
import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { RouterModule } from '@angular/router';
import { AddClientFormComponent } from './management-panel/add-client-form/add-client-form.component';

@NgModule({
  declarations: [ManagementPanelComponent, AddClientFormComponent, IceCreamListComponent],
  imports: [
    CommonModule,
    FirebaseModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementPanelComponent,
        children: [
          {
            path: 'add-client',
            component: AddClientFormComponent,
          },
          {
            path: 'icecream-list',
            component: IceCreamListComponent,
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
})
export class ManagementModule {}
