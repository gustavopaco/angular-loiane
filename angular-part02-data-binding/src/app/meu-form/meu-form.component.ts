import { Component } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: [ '../../vendor/css/pagina-inicial.min.css']
})
export class MeuFormComponent {

  nome?: string = "abc";
  pessoa: any = {
    nome: "",
    idade: 20
  }
}
