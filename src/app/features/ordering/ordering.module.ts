import { SharedModule } from '@shared/shared-module/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderingPanelComponent } from './ordering-panel/ordering-panel.component';
import { NewOrderFormComponent } from './ordering-panel/new-order-form/new-order-form.component';

@NgModule({
  declarations: [OrderingPanelComponent, NewOrderFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderingPanelComponent,
        children: [
          {
            path: 'new-order',
            component: NewOrderFormComponent,
          },
        ],
      },
    ]),
  ],
})
export class OrderingModule {}
