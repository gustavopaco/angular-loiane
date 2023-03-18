import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  URL: string = "//raw.githubusercontent.com/gustavopaco/cidades-estados-BR/main/estados.json"

  constructor(private httpClient: HttpClient) { }

  getEstadosBR() : Observable<any> {
    return this.httpClient.get(this.URL)
  }

  getCargos() {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Senior'}
    ]
  }
}
