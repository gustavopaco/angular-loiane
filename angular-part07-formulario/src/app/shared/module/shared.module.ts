import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormularioDebuggComponent} from "./formulario-debugg/formulario-debugg.component";
import {
  FormularioFloatingFrameworkComponent
} from "./formulario-floating-framework/formulario-floating-framework.component";



@NgModule({
  declarations: [
    FormularioDebuggComponent,
    FormularioFloatingFrameworkComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormularioDebuggComponent
  ]
})
export class SharedModule { }
