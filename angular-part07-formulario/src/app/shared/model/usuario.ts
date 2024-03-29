import {Endereco} from "./endereco";

export class Usuario {

  nome?: string;
  email?: string;
  cep?: string;
  numero?: string;
  complemento?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;

  endereco: Endereco = new Endereco();
}
