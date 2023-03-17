import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TemplateFormPadraoComponent} from "./template-form-padrao/template-form-padrao.component";
import {DataFormReativoComponent} from "./data-form-reativo/data-form-reativo.component";

const routes: Routes = [
  { path: 'template', component: TemplateFormPadraoComponent },

  { path: 'data', component: DataFormReativoComponent },

  { path: '', redirectTo: 'template', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
