import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: [ '../../../assets/css/pagina-inicial.min.css'
  ]
})
export class LibSearchComponent implements OnInit{

  queryField: FormControl = new FormControl();
  readonly SEARCH_URL = `https://api.cdnjs.com/libraries`;
  resulsts$?: Observable<any>;
  total: number = 0

  constructor(private requestApi: HttpClient) {
  }

  ngOnInit(): void {
    this.pesquisaDinamica();
  }

  private pesquisaDinamica() {

    const campos = "name,description,version,homepage";

    let params = new HttpParams();
    params = params.set('fields', campos);

    this.resulsts$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),             // Mapeia os valores remover os espacos
        filter(value => value.length > 1),    // Filtra os valores para comecar somente com 2 caracteres ou mais
        debounceTime(800),                     // Aplica um Delay em milisegundos antes de enviar o request
        distinctUntilChanged(),                         // Se a pesquisa for a mesma nao faz outra requisicao ate que o valor mude
        tap(value => console.log(value)),
        tap(value => params = params.set('search', value)),
        tap(() => console.log(params)),
        switchMap(() => this.requestApi.get(this.SEARCH_URL, {params})),
        tap((response: any) => this.total = response.total),
        tap((response: any) => console.log(response)),
        map((response: any) => response.results)
      )
  }


  onSearch() {
    const campos = "name,description,version,homepage";
    let valor = this.queryField.value
    if (valor && (valor = valor.trim()) !== '') {

      let params = new HttpParams();
      params = params.set('fields', campos);
      params = params.set('search', valor);

      this.resulsts$ = this.requestApi.get(this.SEARCH_URL, {params})
        .pipe(
          tap(res => console.log(res)),
          tap((response: any) => this.total = response.total),
          map(response => response.results)
        )
    }
  }
}
