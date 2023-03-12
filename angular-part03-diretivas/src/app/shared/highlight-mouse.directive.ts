import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  // Escuta algum evento no elemento com a diretiva e faz alguma coisa
  @HostListener('mouseenter') onMouseOver() {
    // this.renderer.setStyle(this.el.nativeElement,"backgroundColor", "yellow");
    this.backgroundColor = "yellow"
  }

  // Escuta algum evento no elemento com a diretiva e faz alguma coisa
  @HostListener('mouseleave') onMouseLeave() {
    // this.renderer.setStyle(this.el.nativeElement,"backgroundColor", "");
    this.backgroundColor = "";
  }

  // Escuta algum atributo do elemento com a diretiva
  @HostBinding('style.backgroundColor') backgroundColor?: string

  constructor(/*private el: ElementRef, private renderer: Renderer2*/) {

  }

}
