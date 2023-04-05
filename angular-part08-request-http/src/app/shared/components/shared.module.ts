import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormularioDebugComponent} from "./formulario-debug/formulario-debug.component";


@NgModule({
  declarations: [
    FormularioDebugComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormularioDebugComponent
  ]
})
export class SharedModule { }
