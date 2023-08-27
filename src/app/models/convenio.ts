import { Medico } from "./medico";

export class Convenio {
    id?: any;
    nome: string;
    medicos: Medico[];
    ativo: boolean;
  }