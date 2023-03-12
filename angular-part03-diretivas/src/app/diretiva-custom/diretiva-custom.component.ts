import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-custom',
  templateUrl: './diretiva-custom.component.html',
  styleUrls: [ '../../vendor/css/pagina-principal.min.css'
  ]
})
export class DiretivaCustomComponent {

  mostrarCursos:boolean = false;

  onMostrarCursos() {
    this.mostrarCursos = !this.mostrarCursos;
  }
}
