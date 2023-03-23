import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "cursos", loadChildren: () => import("./cursos/cursos.module").then(m => m.CursosModule)},
  {path: "", redirectTo: "cursos", pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
