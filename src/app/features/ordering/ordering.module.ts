import { IcecreamBrowserComponent } from './ordering-panel/icecream-browser/icecream-browser.component';
import { SharedModule } from '@shared/shared-module/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderingPanelComponent } from './ordering-panel/ordering-panel.component';
import { NewOrderFormComponent } from './ordering-panel/new-order-form/new-order-form.component';
import { FavouriteIceCreamListComponent } from './ordering-panel/favourite-ice-cream-list/favourite-ice-cream-list.component';
import { CopyLastOrderComponent } from './ordering-panel/copy-last-order/copy-last-order.component';
import { IceCreamCardComponent } from './ordering-panel/icecream-browser/ice-cream-card/ice-cream-card.component';
import { OrderFromFavouritesComponent } from './ordering-panel/icecream-browser/order-from-favourites/order-from-favourites.component';
// import { CurrentDayGuard } from './day.guard';

@NgModule({
  declarations: [
    IcecreamBrowserComponent,
    OrderingPanelComponent,
    NewOrderFormComponent,
    FavouriteIceCreamListComponent,
    CopyLastOrderComponent,
    IceCreamCardComponent,
    OrderFromFavouritesComponent,
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
            path: 'browse-icecream',
            component: IcecreamBrowserComponent,
          },
          {
            path: 'last-order',
            component: CopyLastOrderComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'browse-icecream',
          },
          {
            path: '**',
            redirectTo: 'browse-icecream',
          },
        ],
      },
    ]),
  ],
})
export class OrderingModule {}
