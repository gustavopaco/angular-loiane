import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-output-property',
  templateUrl: './output-property.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class OutputPropertyComponent{

  @Input() valor?: number = 0;

  @Output() alterouValorTotal = new EventEmitter<number>();
  @Output() mudouValor = new EventEmitter();

  // @ViewChild('campoInput') campoValorInput?: ElementRef

  decrementa() {
    this.valor != undefined ? this.valor-- : undefined;
    this.mudouValor.emit({novoValor: this.valor})
    this.alterouValorTotal.emit(this.valor);
    // (this.campoValorInput != undefined ? this.campoValorInput.nativeElement.value-- : undefined);
    // this.mudouValor.emit({novoValor: this.campoValorInput?.nativeElement.value});
    // this.alterouValorTotal.emit(this.campoValorInput?.nativeElement.value);
  }

  incrementa() {
    this.valor != undefined ? this.valor++ : undefined;
    this.mudouValor.emit({novoValor: this.valor})
    this.alterouValorTotal.emit(this.valor);
    // (this.campoValorInput != undefined ? this.campoValorInput.nativeElement.value++ : undefined);
    // this.mudouValor.emit({novoValor: this.campoValorInput?.nativeElement.value});
    // this.alterouValorTotal.emit(this.campoValorInput?.nativeElement.value);

  }
}
