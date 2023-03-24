import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Curso} from "../model/Curso";
import {Api} from "../constant/Api";
import {delay, Observable, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private httpClient: HttpClient) {
  }

  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(Api.cursos())
      .pipe(
        delay(3000),
        tap(console.log),
      )
  }

  addCurso(curso: Curso): Observable<Object> {
    return this.httpClient.post(Api.cursos(), curso).pipe(take(1))
  }
}
