import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

// import {CursosComponent} from "./cursos/cursos.component";
// import {CursoDetalheComponent} from "./cursos/curso-detalhe/curso-detalhe.component";
// import {CursoNotFoundComponent} from "./cursos/curso-not-found/curso-not-found.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {IS_USER_LOGGED, IS_USER_LOGGED_CHILD_FN} from "./shared/guard/auth.guard";
import {CANMATCH} from "./shared/guard/prevent-load.guard";
import {PaginaNaoEncontradaComponent} from "./pagina-nao-encontrada/pagina-nao-encontrada.component";

const APP_ROUTES: Routes = [

  // Obs: Conteudo comentado foi adicionado em outro Modulo de Rota, o nome do modulo eh: CursosRoutingModule
  // /*Note: Quando estiver na URL www.pacoprojects.com/cursos vai abrir o CursosComponent*/
  {path: "cursos",canActivate:[IS_USER_LOGGED], canMatch: [CANMATCH], canActivateChild: [IS_USER_LOGGED_CHILD_FN], loadChildren: () => import("./cursos/cursos.module").then(modulo => modulo.CursosModule)},

  { path: "alunos", canActivate:[IS_USER_LOGGED], canMatch: [CANMATCH], loadChildren: () => import("./alunos/alunos.module").then(modulo => modulo.AlunosModule)},

  /*Note: Quando estiver na URL www.pacoprojects.com/login vai abrir o LoginComponent*/
  {path: "login", component: LoginComponent},

  /*Note: Quando estiver na URL padrao www.pacoprojects.com vai abrir o HomeComponent*/
  { path: 'home', canActivate:[IS_USER_LOGGED], canMatch: [CANMATCH], component: HomeComponent},

  { path: '', canMatch: [CANMATCH], redirectTo: 'home', pathMatch: 'full'},

  { path: '**', component: PaginaNaoEncontradaComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES,{useHash: true})
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
