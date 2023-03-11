import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngstyle',
  templateUrl: './diretiva-ngstyle.component.html',
  styleUrls: [ '../../vendor/css/pagina-principal.min.css'
  ]
})
export class DiretivaNgstyleComponent {

  ativo: boolean = true;
  tamanhoFonte: number = 10;

  alterarStyle() {
    this.ativo = !this.ativo;
  }
}
