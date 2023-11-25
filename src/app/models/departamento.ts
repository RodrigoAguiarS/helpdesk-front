import { ResponsavelDepartamentoDto } from "./responsavelDepartamentoDto";

export class Departamento {
    id?:     any;
    nome: string;
    descricao: string;
    dataCriacao: Date;
    responsavelAtual: ResponsavelDepartamentoDto;
  }