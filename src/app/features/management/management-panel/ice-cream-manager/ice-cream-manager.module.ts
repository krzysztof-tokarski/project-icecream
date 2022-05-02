import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetGlobalUnitsComponent } from './manage-units/set-global-units/set-global-units.component';
import { AssignLocalUnitsComponent } from './manage-units/assign-local-units/assign-local-units.component';



@NgModule({
  declarations: [
    SetGlobalUnitsComponent,
    AssignLocalUnitsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IceCreamManagerModule { }
