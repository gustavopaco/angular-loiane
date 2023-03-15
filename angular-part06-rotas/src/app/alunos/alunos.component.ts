import {Component, OnInit} from '@angular/core';
import {AlunosService} from "../shared/service/alunos.service";
import {Aluno} from "../shared/model/aluno";

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class AlunosComponent implements OnInit{

  isShowAlunos: boolean = true;
  isShowAlunosForm: boolean = false;

  alunos: Aluno[]= []
  constructor(private alunosService: AlunosService) {
  }

  ngOnInit(): void {
    this.alunos = this.alunosService.getAlunos();
  }

  showAlunosForm() {

  }
}
