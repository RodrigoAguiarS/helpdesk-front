import { Venda } from "./venda";

export interface ItemVenda {
    id?: number;
    venda: Venda;
    idProduto: number;
    quantidade: number;
    valorTotal: number;
}