import { Consumidor } from "./consumidor";
import { ItemVenda } from "./itemVenda";
import { Pagamento } from "./pagamento";

export interface Venda {
    id?: any;
    cliente: Consumidor;
    itens: ItemVenda[];
    dataVenda: Date;
    valorTotal: number;
    pagamento: Pagamento;
}