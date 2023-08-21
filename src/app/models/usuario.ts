import { Clinica } from "./clinica";

export class Usuario {
    id?: any;
    email: string;
    senha: string;
    nome: string;
    perfis: string[];
    sexo: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    telefonePrincipal: string;
    telefoneSecundario: string;
    clinica: Clinica;
    ativo: boolean;
}