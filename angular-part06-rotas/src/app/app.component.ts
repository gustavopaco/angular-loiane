import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ '../vendor/css/pagina-inicial.min.css'
  ]
})
export class AppComponent implements OnInit{
  title = 'angular-part06-rotas';
  mostrarMenu?: boolean = false;
  idCurso?: number;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.mostrarMenu = this.authService.isUserLogged();
    this.authService.mostrarMenuEmitter.subscribe((response: any) => setTimeout(() => this.mostrarMenu = response,3000))
  }

  invalidarSessao() {
    this.mostrarMenu = false;
    this.authService.invalidadeSession();
  }
}
