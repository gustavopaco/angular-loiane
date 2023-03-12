import {Component, OnInit} from '@angular/core';
import {CursosService} from "./cursos.service";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class CursosComponent implements OnInit{

  cursos?: string[];

  constructor(private cursosService: CursosService) {
  }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
  }
}
