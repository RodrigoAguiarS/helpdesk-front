import { Endereco } from "./endereco";

export interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: Endereco;
  perfis: string[];
}
