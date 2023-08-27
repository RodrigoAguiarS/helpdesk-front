import { Atendimento } from "./antendimento";
import { Clinica } from "./clinica";
import { Convenio } from "./convenio";
import { Especialidade } from "./especialidade";
import { Pessoa } from "./pessoa";

export class Medico {
    id?: number;
    crm: string;
    clinica: Clinica;
    pessoa: Pessoa;
    especialidades: Especialidade[];
    convenios: Convenio[];
    atendimentos: Atendimento[];
    informacaoExtra: string;
  }