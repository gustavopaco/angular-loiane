import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective{

  // Escuta algum evento no elemento com a diretiva e faz alguma coisa
  @HostListener('mouseenter') onMouseOver() {
    // this.renderer.setStyle(this.el.nativeElement,"backgroundColor", "yellow");
    this.backgroundColor = this.highlightColor;
  }

  // Escuta algum evento no elemento com a diretiva e faz alguma coisa
  @HostListener('mouseleave') onMouseLeave() {
    // this.renderer.setStyle(this.el.nativeElement,"backgroundColor", "");
    this.backgroundColor = this.defaultColor;
  }

  // Escuta algum atributo do elemento com a diretiva
  @HostBinding('style.backgroundColor') backgroundColor?: string

  @Input()defaultColor: string = "white";
  @Input('highlight')highlightColor: string = "yellow";

  constructor() { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }
}
