
import { Injectable } from '@angular/core';
import { ProdutoService } from './produto.service';
import { ItemVenda } from '../models/itemVenda';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  
  private itensVenda: ItemVenda[] = [];

  constructor(private produtoService: ProdutoService ) { }

  adicionarItem(produto: Produto, quantidade: number) {
    const itemExistente = this.getItem(produto.id);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      const novoItem: ItemVenda = {
        produto: produto,
        quantidade: quantidade
      };
      this.itensVenda.push(novoItem);
    }
  }

  removerItem(idProduto: number) {
    const index = this.itensVenda.findIndex(item => item.produto.id === idProduto);
    if (index !== -1) {
      this.itensVenda.splice(index, 1);
    }
  }

  getItem(idProduto: number): ItemVenda | undefined {
    return this.itensVenda.find(item => item.produto.id === idProduto);
  }

  getItensVenda(): ItemVenda[] {
    return this.itensVenda;
  }

  limparCarrinho() {
    this.itensVenda = [];
  }

  getValorTotal(): number {
    let valorTotal = 0;
    for (const item of this.itensVenda) {
      valorTotal += item.produto.preco * item.quantidade;
    }
    return valorTotal;
  }

  getQuantidadeItens(): number {
    return this.itensVenda.length;
  } 
}


