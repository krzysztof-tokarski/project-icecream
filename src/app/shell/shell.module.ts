import { CommonModule } from '@angular/common';
import { IsAuthGuard } from './guards/is-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared-module/shared.module';
import { ShellComponent } from './shell.component';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      // tutaj zacznij dodawać routing aplikacji
      // nie zapomnij o przekierwaniu na domyślny path z  path === ''

      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: 'ordering-panel',
            loadChildren: async () => await (await import('@ordering/ordering.module')).OrderingModule,
            canActivate: [IsAuthGuard],
          },
          {
            path: 'management-panel',
            loadChildren: async () => await (await import('@management/management.module')).ManagementModule,
            canActivate: [IsAuthGuard],
          },
          {
            path: 'auth',
            loadChildren: async () => (await import('../auth/auth.module')).AuthModule,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'ordering-panel',
          },
          {
            path: '**',
            redirectTo: 'ordering-panel',
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
