import {Component, OnDestroy, OnInit} from '@angular/core';
import {CursosService} from "../cursos/cursos.service";
import {Subscription} from "rxjs";
import {CursosInterface} from "../cursos/cursos-interface";

@Component({
  selector: 'app-receber-curso-criado',
  templateUrl: './receber-curso-criado.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class ReceberCursoCriadoComponent implements OnInit, OnDestroy{

  nomeCursoAdicionado?: string;

  cursoInterface?: CursosInterface;
  cursoNotification?: Subscription;
  constructor(private cursosService: CursosService) {
    this.cursoInterface = cursosService;
  }

  ngOnInit(): void {
    this.cursoNotification = this.cursoInterface?.getEventNotification().subscribe(response => {
      this.nomeCursoAdicionado = response;
    })
  }

  ngOnDestroy(): void {
      this.cursoNotification?.unsubscribe();
  }
}
