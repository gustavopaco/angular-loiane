import {Component, OnInit} from '@angular/core';
import {CursosService} from "../cursos/cursos.service";
import {CursosInterface} from "../cursos/cursos-interface";

@Component({
  selector: 'app-criar-cursos',
  templateUrl: './criar-cursos.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'  ],
})
export class CriarCursosComponent implements OnInit{

  cursos?: string[];
  cursosInterface?: CursosInterface;

  nomeCurso?: string;

  constructor(private cursosService: CursosService) {
    this.cursosInterface = this.cursosService;
  }

  ngOnInit(): void {
    this.cursos = this.cursosInterface?.getCursos();
  }

  salvarNovoCurso() {

    if (this?.nomeCurso != null && this.nomeCurso != '') {
      this.cursosInterface?.addCursos(this.nomeCurso)
    }
  }
}
