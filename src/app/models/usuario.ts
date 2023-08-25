import { Clinica } from "./clinica";
import { Pessoa } from "./pessoa";

export class Usuario {
    id?: any;
    email: string;
    senha: string;
    perfis: string[];
    pessoa: Pessoa;
    clinica: Clinica;
    ativo: boolean;
}