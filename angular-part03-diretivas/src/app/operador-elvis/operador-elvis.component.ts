import {Component} from '@angular/core';

@Component({
  selector: 'app-operador-elvis',
  templateUrl: './operador-elvis.component.html',
  styleUrls: [ '../../vendor/css/pagina-principal.min.css']
})
export class OperadorElvisComponent {

  tarefa: any = {
    descricao: "Descrição da tarefa",
    responsavel: {
      usuario: null
    }
    //responsavel : {nome: "Gustavo"}
  };
}
