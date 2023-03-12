import {EventEmitter} from "@angular/core";

export interface CursosInterface {

  getCursos(): string[];

  addCursos(curso: string): void;

  getEventNotification(): EventEmitter<string>;
}
