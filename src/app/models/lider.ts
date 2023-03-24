import { Endereco } from "./endereco";

export interface Lider {
    nome: string;
    email: string;
    celular: string;
    whatsapp: boolean;
    endereco: Endereco;
  }