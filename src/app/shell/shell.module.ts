import { RouterModule } from '@angular/router';
import { ShellComponent } from '@shell/shell.component';
import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';

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
