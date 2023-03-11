import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-input-property',
  templateUrl: './input-property.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class InputPropertyComponent {

  @Input('nome') nomeDoCurso?: string;
}
