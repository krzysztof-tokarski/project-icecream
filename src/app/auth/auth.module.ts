import { SharedModule } from '@shared/shared-module/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginFormComponent,
      },
    ]),
    CommonModule,
  ],
})
export class AuthModule {}
