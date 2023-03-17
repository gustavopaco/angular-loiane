import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepViacepService {

  constructor(private conexao: HttpClient) { }

  consultaCEP(cep: string) : Observable<any> | undefined {
    let cepFormatado = this.formataCep(cep);
    if (cepFormatado != '') {
      console.log("Entrou" + cepFormatado)
      return this.conexao.get(`//viacep.com.br/ws/${cepFormatado}/json`);
    }
    return undefined;
  }

  private formataCep(cep: string): string {
    cep = cep.replace(/\D/g,'');

    // Verifica se campo cep possui valor informado
    if (cep != "") {

      // Expressao Regular para validar CEP
      let validacep = /^[0-9]{8}$/

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return cep
      }
    }
    return '';
  }
}
