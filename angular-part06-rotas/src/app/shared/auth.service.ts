import {EventEmitter, Injectable} from '@angular/core';
import {Usuario} from "../model/usuario";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado?: boolean;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  async doLogin(usuario: Usuario): Promise<boolean> {
    if (usuario.email == "usuario@gmail.com" && usuario.senha == "123456") {
      this.mostrarMenuEmitter.emit(true);
      this.usuarioAutenticado = true;
      setTimeout(() => this.router.navigate(["/"]), 3000)
      return true
    }
    this.mostrarMenuEmitter.emit(false);
    this.usuarioAutenticado = false;
    return false;
  }

  isUserLogged(): boolean {
    return <boolean>this.usuarioAutenticado;
  }
}
