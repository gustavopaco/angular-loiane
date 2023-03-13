import {Component} from '@angular/core';
import {interval, map, Observable, take} from "rxjs";

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
    dataLancamento: new Date(2016, 5, 23),
    url: "https://www.google.com"
  }

  livros: string[] = ["Angular", "Java"]

  valorAdicionado?: string;
  valorFiltrado?: string;

  valorPromiseAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Valor Asincrono"), 3000)
  })
  valorObservableAsync = interval(3000).pipe(map(valor => "Valor Asincrono 2"))


  addValor() {
    if (this.valorAdicionado != null && this.valorAdicionado.trim() != '') {
      this.livros.push(this.valorAdicionado);
    }
  }

  listaComFiltro(): string[] {
    if (this.livros.length === 0 || this.valorFiltrado === undefined || this.valorFiltrado.trim() == '') {
      return this.livros;
    }

    return this.livros.filter((valor: any) => {
      if (valor.toLowerCase().indexOf(this.valorFiltrado?.toLowerCase()) >= 0) {
        return true;
      }
      return false;
    });

  }
}

async function getPromiseAsync(resolve: any) {
  console.log("Comecou a Promise")
  setTimeout(function () {
    console.log("Chamou")
    resolve("Valor Asincrono")
  }, 3000);
  console.log("Terminou a Promise")
}
