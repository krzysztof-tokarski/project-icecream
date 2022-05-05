import { IceCreamListComponent } from './management-panel/ice-cream-manager/ice-cream-list/ice-cream-list.component';
import { IceCreamManagerComponent } from './management-panel/ice-cream-manager/ice-cream-manager.component';
import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { RouterModule } from '@angular/router';
import { AddClientFormComponent } from './management-panel/client-manager/add-client-form/add-client-form.component';
import { DeleteIcecreamFormComponent } from './management-panel/ice-cream-manager/manage-ice-cream/delete-ice-cream-form/delete-ice-cream-form.component';
import { AddGlobalUnitsFormComponent } from './management-panel/ice-cream-manager/manage-units/add-global-units-form/add-global-units-form.component';
// import { AssignLocalUnitsComponent } from './management-panel/ice-cream-manager/manage-units/assign-local-units/assign-local-units.component';
import { AddIcecreamFormComponent } from './management-panel/ice-cream-manager/manage-ice-cream/add-ice-cream-form/add-ice-cream-form.component';
import { DeleteGlobalUnitsFormComponent } from './management-panel/ice-cream-manager/manage-units/delete-global-units-form/delete-global-units-form.component';
import { UnitListComponent } from './management-panel/ice-cream-manager/unit-list/unit-list.component';
import { ClientListComponent } from './management-panel/client-manager/client-list/client-list.component';
import { OrderListComponent } from './management-panel/order-manager/order-list/order-list.component';

@NgModule({
  declarations: [
    AddIcecreamFormComponent,
    DeleteIcecreamFormComponent,
    ManagementPanelComponent,
    AddClientFormComponent,
    IceCreamListComponent,
    IceCreamManagerComponent,
    AddGlobalUnitsFormComponent,
    DeleteGlobalUnitsFormComponent,
    UnitListComponent,
    ClientListComponent,
    OrderListComponent,
    // AssignLocalUnitsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementPanelComponent,
        children: [
          {
            path: 'client-manager/add-client',
            component: AddClientFormComponent,
          },
          {
            path: 'client-manager/client-list',
            component: ClientListComponent,
          },
          {
            path: 'client-manager/order-list',
            component: OrderListComponent,
          },
          {
            path: 'icecream-manager',
            component: IceCreamManagerComponent,
            children: [
              {
                path: 'add-icecream',
                component: AddIcecreamFormComponent,
              },
              {
                path: 'delete-icecream',
                component: DeleteIcecreamFormComponent,
              },
              {
                path: 'icecream-list',
                component: IceCreamListComponent,
              },
              {
                path: 'add-global-units',
                component: AddGlobalUnitsFormComponent,
              },
              {
                path: 'delete-global-units',
                component: DeleteGlobalUnitsFormComponent,
              },
              {
                path: 'unit-list',
                component: UnitListComponent,
              },

              {
                // path: 'local-units',
                // component: AssignLocalUnitsComponent,
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
