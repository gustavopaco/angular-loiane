import {Component, OnInit} from '@angular/core';
// import * as $ from 'jquery'
import {AuthService} from "../shared/auth.service";
import {Usuario} from "../model/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css'
  ]
})
export class LoginComponent implements OnInit{

  // Note: Exemplo de Chamada Asyncrona sendo aplicada evento JQuery "fadeIn"
  // @ViewChild('elementoAsync') el?: ElementRef;

  // login = new Promise<string>(resolve => setTimeout(() => {
  //
  //   $("p").css("display","none").fadeIn();
  //
  //   return resolve("login funcionando")
  //
  // }, 2000))


  usuario: Usuario = new Usuario();
  isUserLogged?: boolean = undefined;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }


  doLogin(): void {
    this.authService.doLogin(this.usuario).then(response => this.isUserLogged = response);

  }
}
