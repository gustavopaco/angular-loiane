import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Subscription} from "rxjs";
import {CursosService} from "../shared/cursos.service";

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styles: [
  ]
})
export class CursoDetalheComponent implements OnInit, OnDestroy{

  id?: string;
  inscricao?: Subscription;

  curso: any;

  constructor(private activatedRoute: ActivatedRoute, private cursosService: CursosService, private router: Router) {
  }

  ngOnInit(): void {
    this.inscricao = this.activatedRoute.params.subscribe((parametros: any) => this.id = parametros['id']);
    this.getCursoDetalhe();
  }

  getCursoDetalhe(): void {
    this.curso = this.cursosService.findCurso(Number(this.id));
    if (this.curso == undefined) {
      this.router.navigate(["/naoEncontrado/", this.id]).then(() => ["/"])
    }
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }

}
