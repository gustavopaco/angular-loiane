import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EnvioDadosWebserviceService {

  constructor(private http: HttpClient) { }

  enviarDados(dados: any): Observable<any> {
    return this.http.post('https://httpbin.org/post',dados);
  }
}
