import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemVenda } from 'src/app/models/itemVenda';
import { Produto } from 'src/app/models/produto';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  ELEMENT_DATA: ItemVenda[] = []

  displayedColumns: string[] = ['nome', 'quantidade', 'precoUnitario', 'total', 'actions'];
  dataSource = new MatTableDataSource<ItemVenda>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  itensVenda: ItemVenda[] = [];
  valorTotal?: number;
  isAbrirModalCarrinho: boolean = false
  isExisteItensCarro?: boolean

  constructor(public carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.dataSource.data = this.carrinhoService.getItensVenda();
    this.valorTotal = this.carrinhoService.getValorTotal();
    console.log(this.dataSource.data); // Verifica se os dados estão sendo carregados corretamente
    console.log(this.valorTotal); // Verifica se o valor total está sendo calculado corretamente
  }

  removerItem(item: ItemVenda) {
    this.carrinhoService.removerItem(item.produto.id);
  }

  abrirModalCarrinho() {
    this.isAbrirModalCarrinho = true;
  }

  fecharModalCarrinho() {
    this.isAbrirModalCarrinho = false;
  }

  getCarrinhoQuantity(): number {
    const itensVenda: ItemVenda[] = this.carrinhoService.getItensVenda();
    let somaQuantidade = 0;

    for (const item of itensVenda) {
      somaQuantidade += item.quantidade;
    }
    if (somaQuantidade === 0) {
      this.carrinhoService.limparCarrinho();
    }
    return somaQuantidade;
  }

  increaseQuantity(produto: Produto) {
    this.carrinhoService.adicionarItem(produto, 1);
    this.dataSource.data = this.carrinhoService.getItensVenda();
    console.log(this.dataSource.data); // Verifica se os itens do carrinho foram atualizados corretamente após adicionar um produto
  }
  
  decreaseQuantity(produto: Produto) {
    const itemNoCarrinho: ItemVenda | undefined = this.carrinhoService.getItem(produto.id);
    if (itemNoCarrinho) {
      itemNoCarrinho.quantidade--;
  
      if (itemNoCarrinho.quantidade === 0) {
        this.carrinhoService.removerItem(produto.id);
      }
  
      this.dataSource.data = this.carrinhoService.getItensVenda();
      console.log(this.dataSource.data); // Verifica se os itens do carrinho foram atualizados corretamente após diminuir a quantidade de um produto
    }
  }

  getQuantidade(idProduto: number): number {
    const itemNoCarrinho: ItemVenda | undefined = this.carrinhoService.getItem(idProduto);
    return itemNoCarrinho ? itemNoCarrinho.quantidade : 0;
  }
}
