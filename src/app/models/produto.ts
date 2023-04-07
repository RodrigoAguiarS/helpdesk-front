import { Categoria } from "./categoria";
import { Estoque } from "./estoque";

export interface Produto {
    id?: any;
    nome: string;
    preco: number;
    descricao: string;
    categoria: Categoria;
    codigoBarras: string;
    estoque: Estoque;
}