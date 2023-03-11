import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngfor',
  templateUrl: './diretiva-ngfor.component.html',
  styleUrls: [ '../../vendor/css/pagina-principal.min.css'
  ]
})
export class DiretivaNgforComponent {

  cursos: string[] = ["Angular", "Java", "Html", "CSS"]
}
