import {Component} from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['../../vendor/css/pagina-inicial.min.css'
  ]
})
export class ExemplosPipesComponent {

  livro: any = {
    titulo: "Aprendendo Javascript",
    rating: 4.54321,
    numeroPaginas: 314,
    preco: 44.99,
    dataLancamento: new Date(2016,5,23),
    url: "https://www.google.com"
  }
}
