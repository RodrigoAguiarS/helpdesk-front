import { Cargo } from "./cargo";
import { Pessoa } from "./pessoa";

export class Funcionario {
    id:    number;
    pessoa: Pessoa;
    cargo: Cargo;
    dataEntrada: Date;
  }