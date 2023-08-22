import {Routes} from "@angular/router";
import {CursosComponent} from "./cursos/cursos.component";
import {CursoFormComponent} from "./curso-form/curso-form.component";

export const CURSOS_ROUTES: Routes = [
  {path: '', pathMatch: 'full', component: CursosComponent},
  {path: 'new', pathMatch: 'full', component: CursoFormComponent},
  {path: 'edit/:id', pathMatch: 'full', component: CursoFormComponent},
];
