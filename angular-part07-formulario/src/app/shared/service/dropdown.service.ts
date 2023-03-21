import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Cidade} from "../model/cidade";

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  URL_ESTADOS: string = "//raw.githubusercontent.com/gustavopaco/cidades-estados-BR/main/estados.json"
  URL_CIDADES: string = "//raw.githubusercontent.com/gustavopaco/cidades-estados-BR/main/cidades.json"

  constructor(private httpClient: HttpClient) { }

  getCidades(estadoID: string): Observable<any> {
    return this.httpClient.get<Cidade[]>(this.URL_CIDADES)
      .pipe(
        map((cidades: Cidade[]) => cidades.filter( c => c.estadoId == estadoID))
      );
  }

  getEstadosBR() : Observable<any> {
    return this.httpClient.get(this.URL_ESTADOS)
  }

  getCargos(): any[] {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Senior'}
    ];
  }

  getTecnologias(): any[] {
    return [
      {nome: "java", desc: "Java"},
      {nome: "javascript", desc: "Javascript"},
      {nome: "php", desc: "PHP"},
      {nome: "ruby", desc: "Ruby"},
      {nome: "html", desc: "HTML"},
      {nome: "css", desc: "CSS"},
      {nome: "kotlin", desc: "Kotlin"},
    ];
  }

  getLinguas(): string[] {
    return ["Portugues", "Inglês", "Espanhol", "Mandarim", "Italiano"]
  }

  getNewsLetter(): any[] {
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não'}
    ];
  }

  getFrameworks(): any[] {
    // return ["Angular", "Rect", "Vue", "Sencha"];
    return [
      {nome: "Angular", stats: false},
      {nome: "React", stats: false},
      {nome: "Vue", stats: false},
      {nome: "Sencha", stats: false}
    ];
  }

  getTelefones(): any[] {
    return [
      { numero: "993039064", tipoTelefone: "CELULAR"}
    ]
  }
}
