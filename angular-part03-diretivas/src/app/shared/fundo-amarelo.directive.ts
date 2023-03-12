import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
// import * as $ from 'jquery'
@Directive({
  selector: '[fundoAmarelo]'
})
export class FundoAmareloDirective implements OnInit{

  elemento?: ElementRef;
  render?: Renderer2;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.elemento = el;
    this.render = renderer;
  }

  ngOnInit(): void {
    // Element BackgroundColor
    this.renderer.setStyle(this.elemento?.nativeElement,"backgroundColor","yellow");

    // FirstElementChild Color
    // this.elemento ? this.elemento.nativeElement.firstElementChild.style.color = "red" : undefined;
    this.renderer.setStyle(this.elemento?.nativeElement.firstElementChild, "color", "red");
    this.renderer.setStyle(this.elemento?.nativeElement.firstElementChild,"backgroundColor","black")

    // LastElementChild BackgroundColor
    this.renderer.setStyle(this.elemento?.nativeElement.lastElementChild,"backgroundColor","lightgreen");
    this.renderer.addClass(this.elemento?.nativeElement.lastElementChild,"btn-lg")

    // InnerHTML
    // this.renderer.setProperty(this.elemento?.nativeElement,"innerHTML","Ola Mundo");

    // Criando Atributo de elemento
    this.renderer.setAttribute(this.elemento?.nativeElement,"valorTotal","50")

    //Removendo Atributo de elemento
    this.renderer.removeAttribute(this.elemento?.nativeElement,"attr2");

    // Append texto
    //   let texto = this.renderer.createText("Texto renderizado no fim");
    //   let texto2 = this.renderer.createText("Texto2 renderizado no fim");
    //   this.renderer.appendChild(this.elemento?.nativeElement, texto)
    //   this.renderer.appendChild(this.elemento?.nativeElement, texto2)

    // Criando elemento e inserindo no DOM
    //     const div = this.renderer.createElement('div');
    //     const text = this.renderer.createText('Inserted at bottom');
    //     this.renderer.appendChild(div,text);
    //     this.renderer.appendChild(this.elemento?.nativeElement,div);

    let h3 = this.renderer.createElement("h3");
    let text2 = this.renderer.createText("Ola h3");
    this.renderer.appendChild(h3, text2);

    let h4 = this.renderer.createElement("h3");
    let text3 = this.renderer.createText("Ola h4");
    this.renderer.appendChild(h4, text3);

    //Before - Fora do Elemento
    // this.elemento?.nativeElement.before(h3);

    // Insert Before - Antes do primeiro elemento
    // this.elemento?.nativeElement.insertBefore(h4,this.elemento?.nativeElement.firstElementChild);

    // Renderer Insert Before - Dentro do Elemento
    // this.renderer.insertBefore(this.elemento?.nativeElement,h3,this.elemento?.nativeElement.firstElementChild);

    // After - Depois do Elemento
    // this.elemento?.nativeElement.after(h3);

    // Append - Depois do ultimo elemento
    // this.renderer.appendChild(this.elemento?.nativeElement,h3);

    // $(function () {
    //   $(`<h3>Ola h3</h3>`).insertBefore($("div[fundoAmarelo]")).css("backgroundColor", "red");
    // })

    // $(function () {
    //   $(`<h3>Ola h3</h3>`).insertAfter($("div[fundoAmarelo]")).css({"backgroundColor": "blue","color": "red"})
    // })

    // $(function () {
    //   $("div[fundoAmarelo]").append(`<h3>Ola h3</h3>`);
    // })
    }
}

