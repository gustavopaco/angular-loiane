import {Component, ElementRef, ViewChild} from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  @ViewChild('elementoAsync') el?: ElementRef;



  login = new Promise<string>(resolve => setTimeout(() => {

    $("p").css("display","none").fadeIn();

    return resolve("login funcionando")

  }, 2000))

}
