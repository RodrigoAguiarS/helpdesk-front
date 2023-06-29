import { Endereco } from "./endereco";

export class Empresa {
    id: number;
    nome: string;
    descricao: string;
    endereco: Endereco;
    telefone: string;
    status: boolean;
  }