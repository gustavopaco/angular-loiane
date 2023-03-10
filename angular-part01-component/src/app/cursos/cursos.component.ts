import { Component } from '@angular/core';

import {CursosService} from "./cursos.service";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: [
    "../../vendor/css/cursos.min.css"
  ]
})
export class CursosComponent {

  nomePortal?: string;
  cursos?: string[];

  constructor(private cursosService: CursosService) {
    this.nomePortal = "https://www.google.com";
    this.cursos = cursosService.getCursos();
  }

}
