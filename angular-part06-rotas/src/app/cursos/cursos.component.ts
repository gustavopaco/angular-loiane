import {Component, OnDestroy, OnInit} from '@angular/core';
import {CursosService} from "../shared/cursos.service";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class CursosComponent implements OnInit, OnDestroy{

  cursos?: any[];

  constructor(private cursosService: CursosService) {
  }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
  }

  ngOnDestroy(): void {
  }
}
