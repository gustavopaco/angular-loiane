import {Component} from '@angular/core';

@Component({
  selector: 'app-diretiva-ngif',
  templateUrl: './diretiva-ngif.component.html',
  styleUrls: [ '../../vendor/css/pagina-principal.min.css'
  ]
})
export class DiretivaNgifComponent{

  cursos: string[] = [];

  mostrarCursos:boolean = false;

  onMostrarCursos() {
    this.mostrarCursos = !this.mostrarCursos;
  }
}
