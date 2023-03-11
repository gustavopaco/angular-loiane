import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class ViewChildComponent{

  @ViewChild('campoInput') valorDigitado?: ElementRef;
  valorAtualizado?: string;



  getValor() {
    this.valorAtualizado = this.valorDigitado?.nativeElement.value;
    // this.valorDigitado != undefined ? this.valorAtualizado = this.valorDigitado.nativeElement.value : undefined;
  }



}
