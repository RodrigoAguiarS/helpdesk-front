import { Departamento } from "./departamento";

export class Cargo {
    id?:     any;
    nome: string;
    descricao: string;
    responsabilidade: string;
    salarioBase: string;
    departamento: Departamento;
  }