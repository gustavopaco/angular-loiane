import {Injectable} from '@angular/core';
import {Aluno} from "../model/aluno";

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private alunos: Aluno[] = [
    {id: 1, nome: "Aluno01", email: "aluno01@gmail.com"},
    {id: 2, nome: "Aluno02", email: "aluno02@gmail.com"},
    {id: 3, nome: "Aluno03", email: "aluno03@gmail.com"},
  ]

  constructor() {
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }

  findAluno(id: number): Aluno | undefined{
    for (let aluno of this.alunos) {
      if (aluno.id == id) {
        return aluno;
      }
    }
   return undefined;
  }
}
