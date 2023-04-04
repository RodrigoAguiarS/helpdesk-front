import { Produto } from "./produto";

export interface Estoque {
    id: number;
    produto: Produto;
    quantidadeEmEstoque: number;
    quantidadeMinima: number;
    quantidadeMaxima: number;
}