import {EventEmitter, Injectable} from '@angular/core';
import {CursosInterface} from "./cursos-interface";

@Injectable({
  providedIn: 'root'
})
export class CursosService implements CursosInterface{

  private notificar = new EventEmitter<string>();
  private cursos: string[] = ["Angular","Java","Html"];

  constructor() { }

  addCursos(curso: string): void {
    this.cursos?.push(curso)
    this.notificar.emit(curso);
  }

  getCursos(): string[] {
    return this.cursos;
  }

  getEventNotification(): EventEmitter<string> {
    return this.notificar;
  }



}
