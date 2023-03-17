import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataFormReativoComponent} from './data-form-reativo/data-form-reativo.component';
import {FormsModule} from "@angular/forms";
import {TemplateFormPadraoModule} from "./template-form-padrao/template-form-padrao.module";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import br from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

registerLocaleData( br, 'pt-BR' );


@NgModule({
  declarations: [
    AppComponent,
    DataFormReativoComponent,
  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserModule,
    TemplateFormPadraoModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
