import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorsComponent } from './components/input-errors/input-errors.component';
import { ToggleComponent } from './components/toggle/toggle.component';



@NgModule({
  declarations: [
    InputErrorsComponent,
    ToggleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputErrorsComponent,
    ToggleComponent
  ]
})
export class SharedModule { }
