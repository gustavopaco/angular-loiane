import {Component, OnInit} from '@angular/core';
import {CursosService} from "../../shared/service/cursos.service";
import {Curso} from "../../shared/model/Curso";

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [
  ]
})
export class CursosListaComponent implements OnInit{

  cursos: Curso[] = []

  constructor(private cursosService: CursosService) {
  }

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(response => this.cursos = response)
  }
}
