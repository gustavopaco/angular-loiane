import {Component, Input} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-formulario-debugg',
  templateUrl: './formulario-debugg.component.html',
  styleUrls: [ '../../../../assets/css/pagina-inicial.min.css'
  ]
})
export class FormularioDebuggComponent {

  @Input() formularioForDebug?: NgForm;
  @Input() formularioReativoDebug?: FormGroup

}
