import { Endereco } from "./endereco";

export interface Lider {
    id?:   any;
    nome: string;
    email: string;
    celular: string;
    whatsapp: boolean;
    endereco: Endereco;
  }