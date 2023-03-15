import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app.routing.module";
// import {routing} from "./app.routing";
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
// import {CursosModule} from "./cursos/cursos.module";
// import {AlunosModule} from "./alunos/alunos.module";
// import { CursosComponent } from './cursos/cursos.component';
// import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
// import { CursoNotFoundComponent } from './cursos/curso-not-found/curso-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    // CursosComponent,
    // CursoDetalheComponent,
    // CursoNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //CursosModule,
    //AlunosModule,
    AppRoutingModule
    //routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
