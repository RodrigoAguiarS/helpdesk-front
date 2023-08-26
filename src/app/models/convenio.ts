import { Medico } from "./medico";

export class Convenio {
    id?: number;
    nome: string;
    medicos: Medico[];
    ativo: boolean;
  }