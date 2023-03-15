import {CanActivateChildFn, CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const IS_USER_LOGGED: CanActivateFn = (route, state) => {

  return VERIFICAR_ACESSO();
}

export const IS_USER_LOGGED_CHILD_FN: CanActivateChildFn = (route, state) => {
  // if (state.url.includes('editar')) {
  //   console.log("Usuario sem acesso")
  //
  //   return false;
  // }
  return VERIFICAR_ACESSO();
}

/*Note: É uma constante que tambem é um metodo com retorno boolean*/
export const VERIFICAR_ACESSO = (): boolean => {

  if (inject(AuthService).isUserLogged()) {
    return true;
  }
  inject(Router).navigate(["/login"]);
  return false;
}
