import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared-module/shared.module';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      // tutaj zacznij dodawać routing aplikacji
      // nie zapomnij o przekierwaniu na domyślny path z  path === ''

      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'auth',
            loadChildren: async () => (await import('../auth/auth.module')).AuthModule,
          },
          {
            path: 'management-panel',
            loadChildren: async () => await (await import('@management/management.module')).ManagementModule,
          },
          {
            path: 'ordering-panel',
            loadChildren: async () => await (await import('@ordering/ordering.module')).OrderingModule,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'auth',
          },
          {
            path: '**',
            redirectTo: 'auth',
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
export class ShellModule {}
