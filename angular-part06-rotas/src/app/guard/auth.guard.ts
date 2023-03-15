import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../shared/auth.service";

export const isUserLoggedGuardFn: CanActivateFn = () => {
  const router = inject(Router);
  if (inject(AuthService).isUserLogged()) {
    return true;
  }
  router.navigate(["/login"]);
  return false;
}
