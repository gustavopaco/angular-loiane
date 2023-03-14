import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {CursosComponent} from "./cursos/cursos.component";
import {ModuleWithProviders} from "@angular/core";
import {CursoDetalheComponent} from "./cursos/curso-detalhe/curso-detalhe.component";
import {CursoNotFoundComponent} from "./cursos/curso-not-found/curso-not-found.component";

const APP_ROUTES: Routes = [

  /*Note: Quando estiver na URL www.pacoprojects.com/cursos vai abrir o CursosComponent*/
  {path: "cursos", component: CursosComponent},

  /*Note: Passando parametro ":id" na URL de Curso para o Componente CursoDetalheComponent*/
  { path: "curso/:id", component: CursoDetalheComponent },

  { path: "naoEncontrado/:id", component: CursoNotFoundComponent },

  /*Note: Quando estiver na URL www.pacoprojects.com/login vai abrir o LoginComponent*/
  {path: "login", component: LoginComponent},

  /*Note: Quando estiver na URL padrao www.pacoprojects.com vai abrir o HomeComponent*/
  { path: '', component: HomeComponent}
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);
