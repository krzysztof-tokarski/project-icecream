import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as authState from './auth/index';

const STATES = [authState];

@NgModule({
  declarations: [],
  imports: [CommonModule, STATES],
})
export class StateModule {}
