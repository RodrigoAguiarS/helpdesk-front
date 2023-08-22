import { Clinica } from "./clinica";

export class Usuario {
    id?: any;
    email: string;
    senha: string;
    nome: string;
    perfis: string[];
    cpf: string;
    clinica: Clinica;
    ativo: boolean;
}