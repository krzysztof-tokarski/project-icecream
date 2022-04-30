import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from '@shell/shell.component';

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
            path: 'management-panel',
            loadChildren: async () => await (await import('@management/management.module')).ManagementModule,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'management-panel',
          },
        ],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
        // to do
      },
    ]),
  ],
})
export class ShellModule {}
