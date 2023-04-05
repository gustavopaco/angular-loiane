import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Curso} from "../model/Curso";
import {Api} from "../constant/Api";
import {delay, Observable, take, tap} from "rxjs";
import {CrudService} from "./crud.service";

@Injectable({
  providedIn: 'root'
})
export class CursosService extends CrudService<Curso>{

  constructor(requestApi: HttpClient) {
    super(requestApi, Api.cursos());
  }
}
