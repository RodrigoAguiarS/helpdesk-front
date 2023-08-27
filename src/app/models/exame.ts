import { Medico } from "./medico";
import { Paciente } from "./paciente";


export class Exame {
  id?: number;
  dataRealizacao: string;  // ou utilize um tipo de data adequado para TypeScript
  resultado: string;
  paciente: Paciente;
  medico: Medico;
}
