import { Consumidor } from "./consumidor";
import { ItemVenda } from "./itemVenda";
import { Pagamento } from "./pagamento";

export interface Venda {
    id?: any;
    consumidor: Consumidor;
    itens: ItemVenda[];
    dataVenda?: Date | string;
    valorTotal?: any;
    pagamento: Pagamento;
}