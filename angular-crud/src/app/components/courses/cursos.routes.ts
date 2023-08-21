import {Routes} from "@angular/router";
import {CursosComponent} from "./cursos/cursos.component";

export const CURSOS_ROUTES: Routes = [
    { path: '', pathMatch: 'full', component: CursosComponent },
];
