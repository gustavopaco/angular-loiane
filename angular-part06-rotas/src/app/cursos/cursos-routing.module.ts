import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CursosComponent} from "./cursos.component";
import {CursoDetalheComponent} from "./curso-detalhe/curso-detalhe.component";
import {CursoNotFoundComponent} from "./curso-not-found/curso-not-found.component";

const cursosRoutes: Routes = [

  /*Note: Quando estiver na URL www.pacoprojects.com/cursos vai abrir o CursosComponent*/
  {path: "", component: CursosComponent},

  /*Note: Sera redirecionado para Pagina de Curso nao encontrado se entrar com "curso/:id" que nao existe no sistema*/
  { path: "naoEncontrado/:id", component: CursoNotFoundComponent },

  /*Note: Passando parametro ":id" na URL de Curso para o Componente CursoDetalheComponent*/
  { path: ":id", component: CursoDetalheComponent},

];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
