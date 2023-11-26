import { Departamento } from "./departamento";

export class Cargo {
    id?:     any;
    nome: string;
    descricao: string;
    responsabilidades: string;
    salarioBase: string;
    departamento: Departamento;
  }