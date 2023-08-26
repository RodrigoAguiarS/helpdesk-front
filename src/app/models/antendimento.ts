import { Clinica } from "./clinica";
import { Convenio } from "./convenio";
import { Exame } from "./exame";
import { HorarioAtendimento } from "./horarioAtendimento";
import { Medico } from "./medico";
import { Paciente } from "./paciente";
import { Usuario } from "./usuario";


export class Atendimento {
  id?: number;
  paciente: Paciente;
  medico: Medico;
  clinica: Clinica;
  data: string; // Utilize um tipo adequado para data em TypeScript
  tipoAtendimento: string;
  convenio: Convenio;
  exame: Exame;
  observacaoMedico: string;
  horarioAtendimento: HorarioAtendimento;
  usuario: Usuario;
}
