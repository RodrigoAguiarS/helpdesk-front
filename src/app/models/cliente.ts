import { Endereco } from './endereco';
export interface Cliente {
    id?:         any;
    nome:     string;
    telefone: string;
    endereco: Endereco;
    perfis: string[];
  }