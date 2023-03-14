import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import {CursosComponent} from "./cursos.component";
import {CursoDetalheComponent} from "./curso-detalhe/curso-detalhe.component";
import {CursoNotFoundComponent} from "./curso-not-found/curso-not-found.component";

@NgModule({
  declarations: [
    CursosComponent,
    CursoDetalheComponent,
    CursoNotFoundComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ]
})
export class CursosModule { }
