import {ResolveFn} from "@angular/router";
import {Curso} from "../model/Curso";
import {inject} from "@angular/core";
import {CursosService} from "../service/cursos.service";
import {of} from "rxjs";

export const CAN_RESOLVE: ResolveFn<Curso> = (route, state) => {

  if (route.params && route.params['id']) {
    return inject(CursosService).loadById(route.params['id'])
  }

  return of(({
    id: undefined,
    nome: undefined
  }))
}
