import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateFormPadraoComponent} from "./template-form-padrao.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PopoverModule} from "ngx-bootstrap/popover";
import {FormularioDebuggComponent} from "../formulario-debugg/formulario-debugg.component";
import {
  FormularioFloatingFrameworkComponent
} from "../formulario-floating-framework/formulario-floating-framework.component";


@NgModule({
  declarations: [
    TemplateFormPadraoComponent,
    FormularioDebuggComponent,
    FormularioFloatingFrameworkComponent
  ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        BsDatepickerModule,
        ReactiveFormsModule,
        TooltipModule,
        PopoverModule
    ]
    ,providers: []
})
export class TemplateFormPadraoModule { }
