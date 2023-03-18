import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataFormReativoComponent} from "./data-form-reativo.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/module/shared.module";


@NgModule({
  declarations: [
    DataFormReativoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DataFormReativoModule { }
