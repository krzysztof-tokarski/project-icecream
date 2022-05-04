import { IcecreamBrowserComponent } from './ordering-panel/icecream-browser/icecream-browser.component';
import { SharedModule } from '@shared/shared-module/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderingPanelComponent } from './ordering-panel/ordering-panel.component';
import { NewOrderFormComponent } from './ordering-panel/new-order-form/new-order-form.component';
import { FavouriteIceCreamListComponent } from './ordering-panel/favourite-ice-cream-list/favourite-ice-cream-list.component';
import { CopyLastOrderComponent } from './ordering-panel/copy-last-order/copy-last-order.component';

@NgModule({
  declarations: [
    IcecreamBrowserComponent,
    OrderingPanelComponent,
    NewOrderFormComponent,
    FavouriteIceCreamListComponent,
    CopyLastOrderComponent,
  ],
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
          {
            path: 'favourite-icecream',
            component: FavouriteIceCreamListComponent,
          },
          {
            path: 'browse-icecream',
            component: IcecreamBrowserComponent,
          },
          {
            path: 'last-order',
            component: CopyLastOrderComponent,
          },
        ],
      },
    ]),
  ],
})
export class OrderingModule {}
