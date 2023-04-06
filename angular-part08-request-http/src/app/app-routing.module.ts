import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "cursos", loadChildren: () => import("./cursos/cursos.module").then(m => m.CursosModule)},
  {path: "upload", loadChildren: () => import("./upload-file/upload-file.module").then(m => m.UploadFileModule)},
  {path: "reactive-search", loadChildren: () => import("./busca-reativa/busca-reativa.module").then(m => m.BuscaReativaModule)},
  {path: "", redirectTo: "reactive-search", pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
