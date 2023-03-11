import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

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

  decrementa() {
    this.valor != undefined ? this.valor-- : undefined;
    this.mudouValor.emit({novoValor: this.valor})
    this.alterouValorTotal.emit(this.valor);
  }

  incrementa() {
    this.valor != undefined ? this.valor++ : undefined
    this.mudouValor.emit({novoValor: this.valor})
    this.alterouValorTotal.emit(this.valor);
  }
}
