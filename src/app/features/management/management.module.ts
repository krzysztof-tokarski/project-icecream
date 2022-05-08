import { RoleGuard } from './../../shell/guards/role.guard';
import { IceCreamListComponent } from './management-panel/ice-cream-manager/ice-cream-list/ice-cream-list.component';
import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { RouterModule } from '@angular/router';
import { AddClientFormComponent } from './management-panel/client-manager/add-client-form/add-client-form.component';
import { DeleteIcecreamFormComponent } from './management-panel/ice-cream-manager/manage-ice-cream/delete-ice-cream-form/delete-ice-cream-form.component';
import { AddGlobalUnitsFormComponent } from './management-panel/ice-cream-manager/manage-units/add-global-units-form/add-global-units-form.component';
import { AddIcecreamFormComponent } from './management-panel/ice-cream-manager/manage-ice-cream/add-ice-cream-form/add-ice-cream-form.component';
import { DeleteGlobalUnitsFormComponent } from './management-panel/ice-cream-manager/manage-units/delete-global-units-form/delete-global-units-form.component';
import { UnitListComponent } from './management-panel/ice-cream-manager/unit-list/unit-list.component';
import { ClientListComponent } from './management-panel/client-manager/client-list/client-list.component';
import { OrderListComponent } from './management-panel/order-manager/order-list/order-list.component';
import { UnifiedListComponent } from './management-panel/order-manager/unified-list/unified-list.component';
import { CalculatorDirective } from './management-panel/order-manager/unified-list/calculator.directive';
import { TotalCellComponent } from './management-panel/order-manager/unified-list/components/total-cell/total-cell.component';
import { Role } from '@shared/models/user/role.enum';

@NgModule({
  declarations: [
    AddIcecreamFormComponent,
    DeleteIcecreamFormComponent,
    ManagementPanelComponent,
    AddClientFormComponent,
    IceCreamListComponent,
    AddGlobalUnitsFormComponent,
    DeleteGlobalUnitsFormComponent,
    UnitListComponent,
    ClientListComponent,
    OrderListComponent,
    UnifiedListComponent,
    CalculatorDirective,
    TotalCellComponent,
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
            path: 'add-client',
            component: AddClientFormComponent,
          },
          {
            path: 'client-list',
            component: ClientListComponent,
          },
          {
            path: 'order-list-client',
            component: OrderListComponent,
          },
          {
            path: 'icecream-production',
            component: UnifiedListComponent,
          },
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
            path: '',
            pathMatch: 'full',
            redirectTo: '',
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'order-list-client',
      },
      {
        path: '**',
        redirectTo: 'order-list-client',
      },
    ]),
  ],
})
export class ManagementModule {}
