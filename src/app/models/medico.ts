import { Especialidade } from "./especialidade";

export interface Medico {
    id?:         any;
    nome:     string;
    cpf:      string;
    telefone: string;
    crm:      string;
    email:    string;
    senha:    string;
    perfis: string[];
    especialidade: Especialidade;
  }