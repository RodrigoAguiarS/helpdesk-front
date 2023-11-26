import { Pessoa } from "./pessoa";

export class Usuario {
    id?:         any;
    email:    string;
    senha:    string;
    pessoa:   Pessoa;
    perfis: string[];
    ativo:      boolean;
  }