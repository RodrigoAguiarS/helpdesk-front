import { Medico } from "./medico";

export class Especialidade {
  id?: any;
  nome: string;
  medicos: Medico[];
  ativo: boolean;
}
