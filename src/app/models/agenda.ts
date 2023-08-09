import { Medico } from "./medico";

export interface Agenda {
    id?:         any;
    medico: Medico;
    horarioInicio: string;
    horarioFim: string;
  }