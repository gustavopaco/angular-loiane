import {environment} from "../../../environments/environment";

export class Api {

  static cursos() {
      return `${environment.API}cursos`;
  }
}
