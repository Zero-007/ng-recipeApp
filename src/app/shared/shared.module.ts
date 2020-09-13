import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceHolderDirective } from './place-holder.directive';



@NgModule({
  declarations: [
      AlertComponent,
      LoadingSpinnerComponent,
      DropdownDirective,
      PlaceHolderDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
    PlaceHolderDirective,
    CommonModule
  ]
})
export class SharedModule { }
