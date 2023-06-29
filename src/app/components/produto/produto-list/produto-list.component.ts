import { Component, OnInit } from '@angular/core';
import { ItemVenda } from 'src/app/models/itemVenda';
import { Produto } from 'src/app/models/produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  produtos?: Produto[];
  quantidade: number = 0;

  constructor(
    private produtoService: ProdutoService,
    public carrinhoService: CarrinhoService,
  ) { }

  ngOnInit() {
    this.produtoService.findAll().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  addToCart(produto: Produto) {
    const itemNoCarrinho: ItemVenda | undefined = this.carrinhoService.getItem(produto.id);
    if (itemNoCarrinho) {
      itemNoCarrinho.quantidade++;
    } else {
      this.carrinhoService.adicionarItem(produto, 1);
    }
  }

  decreaseQuantity(produto: Produto) {
    const itemNoCarrinho: ItemVenda | undefined = this.carrinhoService.getItem(produto.id);
    if (itemNoCarrinho) {
      itemNoCarrinho.quantidade--;

      if (itemNoCarrinho.quantidade === 0) {
        this.carrinhoService.removerItem(produto.id);
      }
    }
  }


  getQuantidade(idProduto: number): number {
    const itemNoCarrinho: ItemVenda | undefined = this.carrinhoService.getItem(idProduto);
    return itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
  }

  getCarrinhoQuantity(): number {
    const itensVenda: ItemVenda[] = this.carrinhoService.getItensVenda();
    let somaQuantidade = 0;

    for (const item of itensVenda) {
      somaQuantidade += item.quantidade;
    }

    return somaQuantidade;
  }
  
}
