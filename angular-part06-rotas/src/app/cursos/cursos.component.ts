import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {CursosService} from "../shared/service/cursos.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class CursosComponent implements OnInit, OnDestroy{

  cursos?: any[];

  pagina?: number;
  inscricao?: Subscription;

  constructor(private cursosService: CursosService, private activatedRoute : ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.inscricao = this.activatedRoute.queryParams.subscribe((value: any) => this.pagina = value['pagina']);
    this.cursos = this.cursosService.getCursos();
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }

  proximaPagina() {
    if (this.pagina) {
      this.pagina++;
    }
    this.router.navigate(['/cursos'], {queryParams:{pagina: this.pagina, user: 'logado'}}).then(() => ['/'])
  }
}
