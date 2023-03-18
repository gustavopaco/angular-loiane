import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataFormReativoComponent} from "./data-form-reativo/data-form-reativo.component";
import {TemplateFormPadraoComponent} from "./template-form-padrao/template-form-padrao.component";

const routes: Routes = [

  { path: 'data', component: DataFormReativoComponent },

  { path: 'template', component: TemplateFormPadraoComponent },

  { path: '', redirectTo: 'data', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
