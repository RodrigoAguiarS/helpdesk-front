import { Categoria } from "./categoria";

export interface ProdutoResposta {
    id?: any;
    nome: string;
    preco: number;
    descricao: string;
    categoria: Categoria;
    codigoBarras: string;
    estoque: {
        quantidadeEmEstoque: number;
        quantidadeMinima: number;
        quantidadeMaxima: number;
    }
}