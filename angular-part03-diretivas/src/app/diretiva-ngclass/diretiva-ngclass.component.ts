import { Component } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngclass',
  templateUrl: './diretiva-ngclass.component.html',
  styleUrls: [ '../../vendor/css/pagina-principal.min.css'
  ]
})
export class DiretivaNgclassComponent {

  clicked: boolean = false;

  onClickStar() {
    this.clicked = !this.clicked;
  }
}
