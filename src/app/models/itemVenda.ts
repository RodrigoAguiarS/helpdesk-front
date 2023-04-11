import { Produto } from "./produto";
import { Venda } from "./venda";

export interface ItemVenda {
    id?: number;
    venda: Venda;
    produto: Produto;
    quantidade: number;
    precoUnitario: number;
    valorTotal: number;
}