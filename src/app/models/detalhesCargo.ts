import { Departamento } from "./departamento";
import { DetalhesResponsavel } from "./detalhesResponsavel";

export class DetalhesCargo {
    id?:     any;
    nome: string;
    descricao: string;
    responsabilidades: string;
    salarioBase: string;
    departamento: Departamento;
    responsavelAtual: DetalhesResponsavel;
  }