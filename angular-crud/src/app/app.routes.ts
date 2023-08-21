import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  {path: 'courses', loadChildren: () => import('./components/courses/cursos.routes').then(m => m.CURSOS_ROUTES)},
];
