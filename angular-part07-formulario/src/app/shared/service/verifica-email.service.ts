import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private httpClient: HttpClient) { }


  /*Note: Esse validador Async precisa de um de Array de Emails do servidor, se o retorno for Boolean
 que é o padrao se email existe no Banco ou nao  so precisa chamar o Observable*/
  asyncValidateMail(emailRequest: string): any {
    return this.httpClient.get("assets/data/emails.json")
      .pipe(
        delay(3000),
        map((obj: any) => obj.emails),
        // tap(console.log),
        map(arrayObject => arrayObject.filter((item: any) => item.email == emailRequest)),
        // tap(console.log),
        map(array => array.length > 0),
        // tap(console.log)
      );


  }

}
