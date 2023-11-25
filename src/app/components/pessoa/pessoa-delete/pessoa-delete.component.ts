import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Endereco } from "src/app/models/endereco";
import { Pessoa } from "src/app/models/pessoa";
import { Usuario } from "src/app/models/usuario";
import { MensagemService } from "src/app/services/mensagem.service";
import { PessoaService } from "src/app/services/pessoa.service";

@Component({
  selector: "app-pessoa-delete",
  templateUrl: "./pessoa-delete.component.html",
  styleUrls: ["./pessoa-delete.component.css"],
})
export class PessoaDeleteComponent implements OnInit {
  usuario: Usuario;

  constructor(
    private pessoaService: PessoaService,
    private mensagemService: MensagemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
    this.usuario.pessoa.endereco = new Endereco();
    this.usuario.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.pessoaService.findById(this.usuario.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.usuario = resposta;
    });
  }

  delete(): void {
    this.pessoaService.delete(this.usuario.id).subscribe(() => {
      this.mensagemService.showSuccessoMensagem
      (this.usuario.pessoa?.nome + ' deletado com sucesso');
      this.router.navigate(['pessoas'])
    }, ex => {
      if(ex.error.status == 403) {
        this.mensagemService.showErrorMensagem(
          "Usuário não tem Permissão " + ex.error.message
        );
      } else {
        this.mensagemService.showErrorMensagem(ex.error.message);
      }
    })
  }

  // Retorna o status formatado
  retornaStatus(status: boolean): string {
    return status ? "ATIVO" : "NÃO ATIVO";
  }
}
