import {CanLoadFn, CanMatchFn} from "@angular/router";
import {VERIFICAR_ACESSO} from "./auth.guard";

export const CANLOAD: CanLoadFn = (route, segments) => {
  return VERIFICAR_ACESSO();
}

export const CANMATCH: CanMatchFn = (route, segments) => {

  return VERIFICAR_ACESSO();
}



