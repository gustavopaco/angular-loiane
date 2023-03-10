import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css' ]
})
export class DataBindingComponent {
  url?: string = "https://www.google.com"
  cursoAngular: boolean = true;
  valorAtual?: string;
  valorSalvo?: string;
  valorNoFocus?: string;
  isMouseOver?: boolean = false;
  valor1?: string | null | number = 0;
  urlImagem: string = "https://fastly.picsum.photos/id/15/400/200.jpg?hmac=uaNcI09cB5t0vyWFjgyTBgL8MVu7HWAW8wajAc_NWyM";
  urlRandomImage: string = "https://picsum.photos/400/200";
  corSelecionada?: string;
  getValor() : number {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }

  trocouValor(corEscolhida: Event) {
    console.log((corEscolhida.target as HTMLSelectElement).value);
  }

  botaoClicado() {
    alert("Cliquei");
  }

  onKeyUp($event: KeyboardEvent) {
    this.valorAtual = ($event.target as HTMLInputElement).value;
  }

  onBlur(valorOnFocusOut: HTMLInputElement) {
    this.valorNoFocus = valorOnFocusOut.value
  }

  onKeyUpEnter(valor?:string) {
    this.valorSalvo = valor;
  }


  onMouseOverAndOut() {
    this.isMouseOver = !this.isMouseOver;
  }
}
