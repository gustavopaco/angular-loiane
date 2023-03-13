import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ '../vendor/css/pagina-inicial.min.css'
  ]
})
export class AppComponent {
  title = 'angular-part06-rotas';

  idCurso?: number;
}
