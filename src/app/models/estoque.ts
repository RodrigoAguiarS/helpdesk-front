import { Produto } from "./produto";

export interface Estoque {
    id?: any;
    quantidadeEmEstoque: number;
    quantidadeMinima: number;
    quantidadeMaxima: number;
}