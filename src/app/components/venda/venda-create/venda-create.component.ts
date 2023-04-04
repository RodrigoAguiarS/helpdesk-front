import { ConfirmacaoModalComponent } from "./../../modal/confirmacao-modal-component/confirmacao-modal-component.component";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from "rxjs";
import { Consumidor } from "src/app/models/consumidor";
import { Pagamento } from "src/app/models/pagamento";
import { Produto } from "src/app/models/produto";
import { Venda } from "src/app/models/venda";
import { ConsumidorService } from "src/app/services/consumidor.service";
import { ProdutoService } from "src/app/services/produto.service";
import { VendaService } from "src/app/services/venda.service";

@Component({
  selector: "app-venda-create",
  templateUrl: "./venda-create.component.html",
  styleUrls: ["./venda-create.component.css"],
})
export class VendaCreateComponent implements OnInit {

  valorTotal: number = 0;

  dataSource: MatTableDataSource<any>;

  consumidor: Consumidor[] = [];
  produtos: Produto[] = [];
  itens: any[] = [];

  pagamento = [
    {value: Pagamento.DINHEIRO, viewValue: 'Dinheiro'},
    {value: Pagamento.CARTAO, viewValue: 'Cartão de crédito'},
    {value: Pagamento.PIX, viewValue: 'Pix'}
  ];
  filteredConsumidors: Observable<Consumidor[]>;
  filteredProdutos: Observable<Produto[]>;

  clienteControl = new FormControl<string | Consumidor>("");
  codigoDeBarraControl = new FormControl();
  nomeDoProdutoControl = new FormControl();
  quantidadeControl = new FormControl();
  pagamentoControl = new FormControl();
  descontoControl = new FormControl();
  valorFinalControl = new FormControl();

  constructor(
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
          : this.consumidor.slice();
      })
    );

    this.filteredProdutos = this.nomeDoProdutoControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterProdutos(value))
    );
  }

  private _filterConsumidors(value: string): Consumidor[] {
    const filterValue = value.toLowerCase();
    return this.consumidor.filter((cliente) =>
      cliente.nome.toLowerCase().includes(filterValue)
    );
  }

  private _filterProdutos(value: string): Produto[] {
    const filterValue = (value ?? "").toLowerCase();
    if (this.produtos) {
      return this.produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
}

  displayConsumidor(consumidor: Consumidor): string {
    return consumidor && consumidor.nome ? consumidor.nome : "";
  }

  private calcularValorTotal(): void {
    this.valorTotal = this.itens.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
  }

  carregarConsumidors(): void {
    this.clienteService.getConsumidors().subscribe((consumidor) => {
      this.consumidor = consumidor;
    });
  }

  onConsumidorSelected(event: MatAutocompleteSelectedEvent): void {
    const nomeConsumidor = event.option.value;
    this.clienteService
      .getConsumidorNome(nomeConsumidor)
      .subscribe((consumidor) => {
        this.consumidor = consumidor;
      });
  }

  carregarProdutos(): void {
    this.produtoService.getProdutos().subscribe((produtos) => {
      this.produtos = produtos;
    });
  }

  adicionarProduto(): void {
    const produtoSelecionado = this.produtos.find(
      (produto) => produto.nome === this.nomeDoProdutoControl.value
    );
    const quantidade = parseInt(this.quantidadeControl.value, 10);

    if (produtoSelecionado && quantidade > 0) {
      const novoItem = {
        produto: produtoSelecionado,
        idProduto: produtoSelecionado.id,
        quantidade: quantidade,
        
      };
      this.itens.push(novoItem);
      this.dataSource = new MatTableDataSource(this.itens);

      this.nomeDoProdutoControl.reset();
      this.quantidadeControl.reset();
      this.calcularValorTotal();
    }
  }

  removerItem(index: number): void {
    this.itens.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.itens);
    this.calcularValorTotal();
  }

  realizarVenda(): void {
    const clienteSelecionado = this.clienteControl.value;
    const pagamentoSelecionado = this.pagamentoControl.value;

    if (!clienteSelecionado) {
      this.snackBar.open("Selecione um cliente.", "", { duration: 3000 });
      return;
    }

    if (!pagamentoSelecionado ) {
      this.snackBar.open("Selecione uma forma de pagamento", "", { duration: 3000 });
      return;
    }

    if (this.itens.length === 0) {
      this.snackBar.open("Adicione pelo menos um produto.", "", {
        duration: 3000,
      });
      return;
    }

    const dialogRef = this.dialog.open(ConfirmacaoModalComponent, {
      width: "350px",
      data: "Deseja confirmar a venda?",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const venda = {
          cliente: this.clienteControl.value,
          itens: this.itens,
          pagamento: this.pagamentoControl.value,
        };
        this.vendaService.finalizarVenda(venda).subscribe(() => {
          this.snackBar.open("Venda realizada com sucesso!", "", {
            duration: 3000,
          });
          this.clienteControl.reset();
          this.nomeDoProdutoControl.reset();
          this.quantidadeControl.reset();
          this.pagamentoControl.reset();
          this.valorFinalControl.reset();
          this.itens = [];
          this.dataSource = new MatTableDataSource(this.itens);
        });
      }
    });
  }
}
