import { Directive, ElementRef, Input, Renderer2, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  @HostBinding("class.open") isOpen = false;

  @HostListener("click") onClick(){
    this.isOpen = !this.isOpen;
  }

  constructor(private elmref:ElementRef,private render:Renderer2) { }

}
