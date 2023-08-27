import { Atendimento } from "./antendimento";
import { Medico } from "./medico";


export class HorarioAtendimento {
  id?: number;
  medico: Medico;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  tipoAtendimento: string;
  duracao: number;
  totalAtendimentos: number;
  atendimentosExtras: number;
  limiteConsultas: number;
  limiteRetornos: number;
  limitePrimeiraVez: number;
  observacao: string;
  atendimentos: Atendimento[];
}
