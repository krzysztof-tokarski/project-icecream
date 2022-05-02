import { RoleGuard } from './guards/role.guard';
import { CommonModule } from '@angular/common';
import { IsAuthGuard } from './guards/is-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared-module/shared.module';
import { ShellComponent } from './shell.component';
import { Role } from '@shared/models/user/role.enum';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      // tutaj zacznij dodawać routing aplikacji
      // nie zapomnij o przekierwaniu na domyślny path z  path === ''

      {
        path: 'app',
        component: ShellComponent,
        canActivate: [IsAuthGuard],
        children: [
          {
            path: 'management-panel',
            loadChildren: async () => await (await import('@management/management.module')).ManagementModule,
            canActivate: [RoleGuard],
            data: { roles: [Role.Seller] },
          },
          {
            path: 'ordering-panel',
            loadChildren: async () => await (await import('@ordering/ordering.module')).OrderingModule,
            canActivate: [RoleGuard],
            data: { roles: [Role.Client] },
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
        path: 'auth',
        component: ShellComponent,
        children: [
          {
            path: '',
            loadChildren: async () => (await import('../auth/auth.module')).AuthModule,
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
        redirectTo: 'app',
      },
      {
        path: '**',
        redirectTo: 'app',
      },
    ]),
  ],
})
export class ShellModule {}
