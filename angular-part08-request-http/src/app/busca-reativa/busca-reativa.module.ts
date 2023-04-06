import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscaReativaRoutingModule } from './busca-reativa-routing.module';
import { LibSearchComponent } from './lib-search/lib-search.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LibSearchComponent
  ],
  imports: [
    CommonModule,
    BuscaReativaRoutingModule,
    ReactiveFormsModule
  ]
})
export class BuscaReativaModule { }
