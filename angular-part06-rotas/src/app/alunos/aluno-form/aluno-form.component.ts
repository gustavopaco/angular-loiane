import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AlunosService} from "../../shared/alunos.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: [ '../../../vendor/css/pagina-inicial.min.css'
  ]
})
export class AlunoFormComponent implements OnInit, OnDestroy{

  // @Input('renderAlunosForm') renderAlunosForm: boolean = false;

  pathVariable?: string;
  inscricao?: Subscription;

  aluno: any;

  aluno2: any
  constructor(private alunosService: AlunosService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.inscricao = this.activatedRoute.params.subscribe(path => this.pathVariable = path['id']);
    this.aluno = this.alunosService.findAluno(Number(this.pathVariable))
  }

  ngOnDestroy() {
    this.inscricao?.unsubscribe();
  }

}
