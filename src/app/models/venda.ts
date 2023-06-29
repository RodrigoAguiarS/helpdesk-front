import { Cliente } from "./cliente";
import { ItemVenda } from "./itemVenda";

export interface Venda {
    cliente: Cliente;
    itensVenda: ItemVenda[];
}