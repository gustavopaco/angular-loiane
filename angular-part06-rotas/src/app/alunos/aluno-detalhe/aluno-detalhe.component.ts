import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlunosService} from "../../shared/alunos.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styles: [
  ]
})
export class AlunoDetalheComponent implements OnInit, OnDestroy{

  pathVariable?: string;
  inscricao?: Subscription;
  aluno?: any;

  constructor(private alunosService: AlunosService, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.inscricao = this.activatedRoute.params.subscribe( path => {
      this.pathVariable = path['id'];
      this.aluno = this.alunosService.findAluno(Number(this.pathVariable));
    });

  }



  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }
}
