import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

// import {CursosComponent} from "./cursos/cursos.component";
// import {CursoDetalheComponent} from "./cursos/curso-detalhe/curso-detalhe.component";
// import {CursoNotFoundComponent} from "./cursos/curso-not-found/curso-not-found.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";

const APP_ROUTES: Routes = [

  // Obs: Conteudo comentado foi adicionado em outro Modulo de Rota, o nome do modulo eh: CursosRoutingModule
  // /*Note: Quando estiver na URL www.pacoprojects.com/cursos vai abrir o CursosComponent*/
  {path: "cursos", loadChildren: () => import("./cursos/cursos.module").then(modulo => modulo.CursosModule)},

  { path: "alunos", loadChildren: () => import("./alunos/alunos.module").then(modulo => modulo.AlunosModule)},

  /*Note: Quando estiver na URL www.pacoprojects.com/login vai abrir o LoginComponent*/
  {path: "login", component: LoginComponent},

  /*Note: Quando estiver na URL padrao www.pacoprojects.com vai abrir o HomeComponent*/
  { path: '', component: HomeComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
