import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import br from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {DataFormReativoModule} from "./data-form-reativo/data-form-reativo.module";
import {TemplateFormPadraoModule} from "./template-form-padrao/template-form-padrao.module";

registerLocaleData( br, 'pt-BR' );


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TemplateFormPadraoModule,
    DataFormReativoModule,
    TooltipModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
