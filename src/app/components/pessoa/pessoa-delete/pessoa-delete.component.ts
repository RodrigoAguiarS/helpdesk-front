import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cargo } from "src/app/models/cargo";

import { Endereco } from "src/app/models/endereco";
import { Pessoa } from "src/app/models/pessoa";
import { Usuario } from "src/app/models/usuario";
import { CargoService } from "src/app/services/cargo.service";
import { MensagemService } from "src/app/services/mensagem.service";
import { PessoaService } from "src/app/services/pessoa.service";

@Component({
  selector: "app-pessoa-delete",
  templateUrl: "./pessoa-delete.component.html",
  styleUrls: ["./pessoa-delete.component.css"],
})
export class PessoaDeleteComponent implements OnInit {
  usuario: Usuario;
  cargos: Cargo[] = [];

  constructor(
    private pessoaService: PessoaService,
    private mensagemService: MensagemService,
    private cargoService: CargoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
    this.usuario.pessoa.endereco = new Endereco();
    this.usuario.cargo = new Cargo();
    this.usuario.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllCargos();
  }

  findById(): void {
    this.pessoaService.findByIdPessoa(this.usuario.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.usuario = resposta;
    });
  }

  delete(): void {
    this.pessoaService.delete(this.usuario.id).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(this.usuario.pessoa?.nome + ' deletado com sucesso');
        this.router.navigate(['pessoas']);
      },
      error: (ex) => {
        if (ex.error.status == 403) {
          this.mensagemService.showErrorMensagem("Usuário não tem Permissão " + ex.error.message);
        } else {
          this.mensagemService.showErrorMensagem(ex.error.message);
        }
      }
    });
  }

  findAllCargos(): void {
    this.cargoService.findAll().subscribe((resposta) => {
      this.cargos = resposta;
    });
  }

  // Retorna o status formatado
  retornaStatus(status: boolean): string {
    return status ? "ATIVO" : "NÃO ATIVO";
  }
}
