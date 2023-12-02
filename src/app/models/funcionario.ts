import { Cargo } from "./cargo";
import { DetalhesResponsavel } from "./detalhesResponsavel";
import { Pessoa } from "./pessoa";

export class Funcionario {
    id:    number;
    pessoa: Pessoa;
    cargo: Cargo;
    dataEntrada: Date;
    gestor: DetalhesResponsavel;
  }