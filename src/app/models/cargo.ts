import { Departamento } from "./departamento";

export class Cargo {
    id: string;
    nome: string;
    descricao: string;
    responsabilidade: string;
    salarioBase: string;
    departamento: Departamento;
  }