import { ItemVenda } from './../../../models/itemVenda';
import { TableService } from './../../../services/table.service';
import { ConfirmacaoModalComponent } from "./../../modal/confirmacao-modal-component/confirmacao-modal-component.component";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith} from "rxjs";
import { Consumidor } from "src/app/models/consumidor";
import { Pagamento } from "src/app/models/pagamento";
import { Produto } from "src/app/models/produto";
import { Venda } from 'src/app/models/venda';
import { ConsumidorService } from "src/app/services/consumidor.service";
import { ProdutoService } from "src/app/services/produto.service";
import { VendaService } from "src/app/services/venda.service";

@Component({
  selector: "app-venda-create",
  templateUrl: "./venda-create.component.html",
  styleUrls: ["./venda-create.component.css"],
})
export class VendaCreateComponent implements OnInit {
  valorTotalFormatado: string = "";
  valorTotal: number = 0;
  venda: any;
  dataSource: MatTableDataSource<ItemVenda>;

  consumidores: Consumidor[] = [];
  produtos: Produto[] = [];
  itensVenda: any[] = [];

  pagamento = [
    { value: Pagamento.DINHEIRO, viewValue: "Dinheiro" },
    { value: Pagamento.CARTAO, viewValue: "Cartão" },
    { value: Pagamento.PIX, viewValue: "Pix" },
  ];
  filteredConsumidors: Observable<Consumidor[]>;
  filteredProdutos: Observable<Produto[]>;

  clienteControl = new FormControl<string | Consumidor>("");
  codigoDeBarraControl = new FormControl();
  produtoControl = new FormControl();
  quantidadeControl = new FormControl();
  pagamentoControl = new FormControl();
  descontoControl = new FormControl();
  valorFinalControl = new FormControl();

  constructor(
    private tableService: TableService,
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private clienteService: ConsumidorService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarConsumidors();
    this.carregarProdutos();
    this.calcularValorTotal();
    
    



    this.filteredConsumidors = this.clienteControl.valueChanges.pipe(
      startWith(""),
      map((value) => {
        const nome = typeof value === "string" ? value : value?.nome;
        return typeof nome === "string"
          ? this._filterConsumidors(nome)
          : this.consumidores.slice();
      })
    );

    this.filteredProdutos = this.produtoControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterProdutos(value))
    );
  }

  private _filterConsumidors(value: string): Consumidor[] {
    const filterValue = value.toLowerCase();
    return this.consumidores.filter((cliente) =>
      cliente.nome.toLowerCase().includes(filterValue)
    );
  }

  private _filterProdutos(value: string): Produto[] {
    const filterValue = (value ?? "").toLowerCase();
    if (this.produtos) {
      return this.produtos.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(filterValue) ||
          produto.codigoBarras.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  selecionarProduto(event: MatAutocompleteSelectedEvent): void {
    const produtoSelecionado = this.produtos.find(
      (produto) => produto.nome === event.option.value
    );
    if (produtoSelecionado) {
      this.produtoControl.setValue(produtoSelecionado.nome);
      this.codigoDeBarraControl.setValue(produtoSelecionado.codigoBarras);
    }
  }

  displayConsumidor(consumidor: Consumidor): string {
    return consumidor && consumidor.nome ? consumidor.nome : "";
  }

  private calcularValorTotal(): void {
    this.valorTotal = this.itensVenda.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
    this.valorTotalFormatado = this.valorTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  carregarConsumidors(): void {
    this.clienteService.getConsumidors().subscribe((consumidor) => {
      this.consumidores = consumidor;
    });
  }

  onConsumidorSelected(event: MatAutocompleteSelectedEvent): void {
    const nomeConsumidor = event.option.value;
    this.clienteService
      .getConsumidorNome(nomeConsumidor)
      .subscribe((consumidor) => {
        this.consumidores = consumidor;
      });
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  adicionarProduto(): void {
    let produtoSelecionado = this.produtos.find(
      (produto) =>
        produto.codigoBarras === this.produtoControl.value ||
        produto.nome === this.produtoControl.value
    );
    const quantidade = parseInt(this.quantidadeControl.value, 10);
    let quantidadeEmEstoque: number;

    if (produtoSelecionado && quantidade > 0) {
      this.produtoService.verificarEstoque(produtoSelecionado.id).subscribe(
        (estoque: number) => {
          quantidadeEmEstoque = estoque;
          if (quantidadeEmEstoque >= quantidade) {
            const novoItem = {
              produto: produtoSelecionado,
              idProduto: produtoSelecionado.id,
              quantidade: quantidade,
              estoque: quantidadeEmEstoque,
            };
            this.adicionarItemVenda(novoItem);
          } else {
            this.snackBar.open("Quantidade insuficiente no estoque!", "", {
              duration: 3000,
            });
          }
        },
        (erro) => {
          console.error("Erro ao verificar estoque", erro);
          this.snackBar.open("Erro ao verificar estoque!", "", {
            duration: 3000,
          });
        }
      );
    }
  }

  adicionarItemVenda(novoItem: any): void {
    this.itensVenda.push(novoItem);
    this.dataSource = new MatTableDataSource(this.itensVenda);
    this.produtoControl.reset();
    this.quantidadeControl.reset();
    this.calcularValorTotal();
  }

  verificarEstoque(id: number): Observable<number> {
    return this.produtoService.verificarEstoque(id);
  }

  removerItem(index: number): void {
    this.itensVenda.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.itensVenda);
    this.calcularValorTotal();
  }

  validarCliente(): boolean {
    if (!this.clienteControl.value) {
      this.snackBar.open("Selecione um cliente.", "", { duration: 3000 });
      return false;
    }
    return true;
  }

  validarPagamento(): boolean {
    if (!this.pagamentoControl.value) {
      this.snackBar.open("Selecione uma forma de pagamento", "", {
        duration: 3000,
      });
      return false;
    }
    return true;
  }

  validarItens(): boolean {
    if (this.itensVenda.length === 0) {
      this.snackBar.open("Adicione pelo menos um produto.", "", {
        duration: 3000,
      });
      return false;
    }
    return true;
  }

  realizarVenda(): void {
    if (
      !this.validarCliente() ||
      !this.validarPagamento() ||
      !this.validarItens()
    ) {
      return;
    }
    this.confirmarVenda();
  }

  confirmarVenda(): void {
    const dialogRef = this.dialog.open(ConfirmacaoModalComponent, {
      width: "350px",
      data: "Deseja confirmar a venda?",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.finalizarVenda();
      }
    });
  }

  finalizarVenda(): void {
    const venda = {
      cliente: this.clienteControl.value,
      itens: this.itensVenda,
      pagamento: this.pagamentoControl.value,
    };

    this.vendaService.finalizarVenda(venda).subscribe((idVenda) => {
      this.snackBar.open("Venda realizada com sucesso!", "", {
        duration: 3000,
      });

      this.resetarCampos();
      this.buscarItensVenda(idVenda.id);
    });
  }

  resetarCampos(): void {
    this.clienteControl.reset();
    this.produtoControl.reset();
    this.quantidadeControl.reset();
    this.pagamentoControl.reset();
    this.valorFinalControl.reset();
    this.itensVenda = [];
    this.dataSource = new MatTableDataSource(this.itensVenda);
  }
  
  buscarItensVenda(idVenda: number): void {
    this.vendaService.buscarItensVenda(idVenda).subscribe(
      (venda) => {
        this.venda = venda;
        this.tableService.gerarPdfCompra(this.venda);
      },
      (error) => {
        if (
          error.status === 500 &&
          error.error.message &&
          error.error.message.includes("Quantidade insuficiente")
        ) {
          this.snackBar.open("Quantidade insuficiente no estoque!", "", {
            duration: 3000,
          });
        } else {
          this.snackBar.open("Erro ao realizar a venda!", "", {
            duration: 3000,
          });
        }
      }
    );
  }
}
