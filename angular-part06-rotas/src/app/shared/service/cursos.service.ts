import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos: any[] = [{id: 0, nome: "Angular"},{id: 1, nome: "Java"}];
  constructor() { }

  getCursos(): any[] {
    return this.cursos;
  }

  findCurso(id: number): any {
    for (let curso of this.cursos) {
      if (curso.id === id)
        return curso
    }
  }

}
