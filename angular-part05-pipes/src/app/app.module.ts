import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import br from '@angular/common/locales/pt';
import {registerLocaleData} from "@angular/common";

import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';
import {SettingsService} from "./shared/settings.service";
import { FiltroArrayPipe } from './shared/filtro-array.pipe';
import {FormsModule} from "@angular/forms";
import { FiltroArrayImpuroPipe } from './shared/filtro-array-impuro.pipe';

registerLocaleData(br,'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe,
    FiltroArrayPipe,
    FiltroArrayImpuroPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    // Internacionalizacao
    //{provide: LOCALE_ID, useValue: 'pt-BR'}
    {provide: LOCALE_ID, deps: [SettingsService], useFactory: (settingsService: SettingsService) => settingsService.getLocale()}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
