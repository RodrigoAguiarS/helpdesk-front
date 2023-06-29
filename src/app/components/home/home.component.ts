import { TecnicoService } from 'src/app/services/tecnico.service';
import { Component, OnInit } from "@angular/core";
import { ItemVenda } from "src/app/models/itemVenda";
import { Tecnico } from "src/app/models/tecnico";
import { CarrinhoService } from "src/app/services/carrinho.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {

  tecnico: Tecnico;

  isAdm: boolean;

  constructor(public carrinhoService: CarrinhoService,
    public tecnicoService: TecnicoService) {}

  ngOnInit(): void {
    this.verificarPerfilAdm();
    this.tecnicoService.ObterDadosUsuario().subscribe(
      (tecnico: Tecnico) => {
        this.tecnico = tecnico;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  isAbrirLateralCarrinho = false;

  abrirCarrinho() {
    this.isAbrirLateralCarrinho = true;
  }

  fecharCarrinho() {
    this.isAbrirLateralCarrinho = false;
  }

  getCarrinhoQuantity(): number {
    const itensVenda: ItemVenda[] = this.carrinhoService.getItensVenda();
    let somaQuantidade = 0;

    for (const item of itensVenda) {
      somaQuantidade += item.quantidade;
    }
    if (somaQuantidade === 0) {
      this.carrinhoService.limparCarrinho();
      this.isAbrirLateralCarrinho = false
    }
    return somaQuantidade;
  }

  verificarPerfilAdm(): void {
    this.tecnicoService.verificarPerfilAdm().subscribe(
      (isAdm: boolean) => {
        this.isAdm = isAdm;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
