import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PartialObserver } from "rxjs";
import { Departamento } from "src/app/models/departamento";
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

  // deletar pessoa.
  delete(): void {
    const observer: PartialObserver<Departamento> = {
      next: (value: Departamento) => {
        this.mensagemService.showSuccessoMensagem(
          "Departamento " + value.nome + " deletado com sucesso"
        );
        this.router.navigate(["departamentos"]);
      },
      error: (ex: any) => {
        if (ex.error.status == 403) {
          this.mensagemService.showErrorMensagem(
            "Usuário não tem Permissão " + ex.error.message
          );
        } else {
          this.mensagemService.showErrorMensagem(ex.error.message);
        }
      },
    };
  }

  // Retorna o status formatado
  retornaStatus(status: boolean): string {
    return status ? "ATIVO" : "NÃO ATIVO";
  }
}
