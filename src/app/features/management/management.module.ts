import { IceCreamListComponent } from './management-panel/ice-cream-manager/ice-cream-list/ice-cream-list.component';
import { IceCreamManagerComponent } from './management-panel/ice-cream-manager/ice-cream-manager.component';
import { AddIceCreamFormComponent } from './management-panel/ice-cream-manager/manage-ice-cream/add-ice-cream-form/add-ice-cream-form.component';
import { FirebaseModule } from '@shared/firebase-module/firebase.module';
import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { RouterModule } from '@angular/router';
import { AddClientFormComponent } from './management-panel/add-client-form/add-client-form.component';
import { DeleteIceCreamFormComponent } from './management-panel/ice-cream-manager/manage-ice-cream/delete-ice-cream-form/delete-ice-cream-form.component';

@NgModule({
  declarations: [
    ManagementPanelComponent,
    AddClientFormComponent,
    IceCreamListComponent,
    AddIceCreamFormComponent,
    IceCreamManagerComponent,
    DeleteIceCreamFormComponent,
  ],
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
            path: 'icecream-manager',
            component: IceCreamManagerComponent,
            children: [
              {
                path: 'add-icecream',
                component: AddIceCreamFormComponent,
              },
              {
                path: 'delete-icecream',
                component: DeleteIceCreamFormComponent,
              },
              {
                path: 'icecream-list',
                component: IceCreamListComponent,
              },
            ],
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
