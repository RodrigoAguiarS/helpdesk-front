import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Departamento } from "src/app/models/departamento";
import { DepartamentoService } from "src/app/services/departamento.service";
import { MensagemService } from "src/app/services/mensagem.service";

@Component({
  selector: "app-departamento-create",
  templateUrl: "./departamento-create.component.html",
  styleUrls: ["./departamento-create.component.css"],
})
export class DepartamentoCreateComponent implements OnInit {
  departamento: Departamento;

  constructor(
    private mensagemService: MensagemService,
    private departamentoService: DepartamentoService,
    private router: Router
  ) {}

  // Definição dos formulários
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  descricao: FormControl = new FormControl(null, Validators.minLength(3));

  ngOnInit(): void {
    this.departamento = new Departamento();
  }

  create(): void {
    // Preenchimento dos dados do departamento
    this.departamento.nome = this.nome.value;
    this.departamento.descricao = this.descricao.value;

    // Chamada do serviço para criar o usuário
    this.departamentoService.create(this.departamento).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Departamento " + resposta.nome + " cadastrado com sucesso"
        );
        this.router.navigate(["departamentos"]);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.mensagemService.showErrorMensagem(element.message);
          });
        } else {
          this.mensagemService.showErrorMensagem(ex.error.message);
        }
      },
    });
  }

  // validacao de campos
  validaCampos(): boolean {
    return this.nome.valid && this.descricao.valid
  }
}
