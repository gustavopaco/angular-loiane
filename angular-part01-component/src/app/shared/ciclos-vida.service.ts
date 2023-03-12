import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiclosVidaService {

  private ciclos: string[] = [];

  private notification = new EventEmitter<string[]>();

  isChanged: boolean = false
  constructor() { }

  getCiclos() : string[] {
    return this.ciclos;
  }

  addCiclo(ciclo: string): void {
    this.ciclos.push(ciclo);
    this.notification.emit(this.ciclos);
  }

  resetCiclo(): void {
    this.isChanged = false
    this.ciclos.length = 0;
    this.notification.emit(this.ciclos);
  }

  getNotification(): EventEmitter<string[]> {
    return this.notification;
  }
}
