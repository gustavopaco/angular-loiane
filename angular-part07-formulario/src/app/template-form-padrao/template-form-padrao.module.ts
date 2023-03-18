import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplateFormPadraoComponent} from "./template-form-padrao.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PopoverModule} from "ngx-bootstrap/popover";
import {SharedModule} from "../shared/module/shared.module";


@NgModule({
  declarations: [
    TemplateFormPadraoComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NoopAnimationsModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    TooltipModule,
    PopoverModule,
    SharedModule
  ],
    exports: [
    ]
    ,providers: []
})
export class TemplateFormPadraoModule { }
