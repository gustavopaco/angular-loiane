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

  getCargos(): any[] {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Senior'}
    ]
  }

  getTecnologias(): any[] {
    return [
      {nome: "java", desc: "Java"},
      {nome: "javascript", desc: "Javascript"},
      {nome: "php", desc: "PHP"},
      {nome: "ruby", desc: "Ruby"},
    ];
  }
}
