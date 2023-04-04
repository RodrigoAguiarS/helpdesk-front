import { Categoria } from "./categoria";
import { Estoque } from "./estoque";

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    categoria: Categoria;
    codigoBarras: string;
    estoqueAtual: Estoque;
}