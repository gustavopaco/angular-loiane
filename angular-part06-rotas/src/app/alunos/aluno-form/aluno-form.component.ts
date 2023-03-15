import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AlunosService} from "../../shared/service/alunos.service";
import {Subscription} from "rxjs";
import {IformCanDeactivate} from "../../shared/interface/iform-can-deactivate";
import {Aluno} from "../../shared/model/aluno";

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: [ '../../../vendor/css/pagina-inicial.min.css'
  ]
})
export class AlunoFormComponent implements OnInit, OnDestroy, IformCanDeactivate{

  // @Input('renderAlunosForm') renderAlunosForm: boolean = false;

  pathVariable?: string;
  inscricao?: Subscription;

  aluno?: Aluno = new Aluno();

  aluno2: any;

  alterourFormulario: boolean = false;
  constructor(private alunosService: AlunosService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.inscricao = this.activatedRoute.params.subscribe(path => this.pathVariable = path['id']);
    this.aluno = this.alunosService.findAluno(Number(this.pathVariable))
  }

  ngOnDestroy() {
    this.inscricao?.unsubscribe();
  }

  alterouForm() {
    this.alterourFormulario = true;
  }

  podeMudarRota(): boolean {
    return this.alterourFormulario ? confirm("Tem certeza que deseja sair dessa pagina") : true;
  }

  canDeactivate() {
    return this.podeMudarRota();
  }


}
