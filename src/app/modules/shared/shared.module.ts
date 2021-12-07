import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorsComponent } from './components/input-errors/input-errors.component';



@NgModule({
  declarations: [
    InputErrorsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputErrorsComponent,
  ]
})
export class SharedModule { }
