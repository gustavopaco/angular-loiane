import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Curso} from "../model/Curso";
import {Api} from "../constant/Api";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(Api.cursos())
      .pipe(
      tap(console.log)
      )
  }
}
