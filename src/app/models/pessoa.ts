import { Cargo } from "./cargo";
import { Endereco } from "./endereco";

export class Pessoa {
    id?:         any;
    nome:     string;
    cpf:      string;
    telefone: string;
    endereco: Endereco;
    dataNascimento: Date;
    sexo:    string;
  }