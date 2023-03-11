import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MeuFormModule} from "./meu-form/meu-form.module";

import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { InputPropertyComponent } from './input-property/input-property.component';
import { OutputPropertyComponent } from './output-property/output-property.component';
import { ViewChildComponent } from './view-child/view-child.component';

@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    InputPropertyComponent,
    OutputPropertyComponent,
    ViewChildComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MeuFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
