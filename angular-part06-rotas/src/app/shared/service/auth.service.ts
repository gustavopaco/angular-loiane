import {EventEmitter, Injectable} from '@angular/core';
import {Usuario} from "../model/usuario";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  async doLogin(usuario: Usuario): Promise<boolean> {
    if (usuario.email == "usuario@gmail.com" && usuario.senha == "123456") {
      sessionStorage.setItem("usuarioLogado", "true");
      this.mostrarMenuEmitter.emit(this.isUserLogged());
      setTimeout(() => this.router.navigate(["/"]), 3000)
      return true
    }
    this.mostrarMenuEmitter.emit(this.isUserLogged());
    return false;
  }

  isUserLogged(): boolean {
    return  sessionStorage.getItem("usuarioLogado") != undefined;
    // return <boolean>this.usuarioAutenticado;
  }

  invalidadeSession(): void {
    sessionStorage.clear();
    this.mostrarMenuEmitter.emit(this.isUserLogged());
    this.router.navigate(["/login"]);
  }
}
