import {ResolveFn} from "@angular/router";
import {Aluno} from "../model/aluno";
import {inject} from "@angular/core";
import {AlunosService} from "../service/alunos.service";

export const LOAD_ALUNO: ResolveFn<Aluno|undefined> = (route, state) => {
  let idAluno = route.params["id"];

  return  inject(AlunosService).findAluno(idAluno)
}
