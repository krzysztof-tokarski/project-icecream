import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'auth',
        loadChildren: async () => (await import('./auth/auth.module')).AuthModule,
      },
      {
        path: 'app',
        loadChildren: async () => (await import('./shell/shell.module')).ShellModule,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'app',
      },
      {
        path: '**',
        redirectTo: 'auth',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
