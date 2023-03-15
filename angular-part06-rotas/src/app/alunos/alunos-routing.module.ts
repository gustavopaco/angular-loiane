import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AlunosComponent} from "./alunos.component";
import {AlunoDetalheComponent} from "./aluno-detalhe/aluno-detalhe.component";
import {AlunoFormComponent} from "./aluno-form/aluno-form.component";
import {FORM_DEACTIVATE_FN} from "../shared/guard/prevent-exit.guard";
import {LOAD_ALUNO} from "../shared/guard/load-data.resolver";
import {IS_USER_LOGGED_CHILD_FN} from "../shared/guard/auth.guard";

const alunosRoutes: Routes = [

  {
    path: "", component: AlunosComponent, canActivateChild: [IS_USER_LOGGED_CHILD_FN], children: [
      { path: "novo", component: AlunoFormComponent, canDeactivate: [FORM_DEACTIVATE_FN]},
      { path: ":id", component: AlunoDetalheComponent, resolve: {aluno: LOAD_ALUNO}},
      { path: ":id/editar", component: AlunoFormComponent, canDeactivate: [FORM_DEACTIVATE_FN]},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule {
}
