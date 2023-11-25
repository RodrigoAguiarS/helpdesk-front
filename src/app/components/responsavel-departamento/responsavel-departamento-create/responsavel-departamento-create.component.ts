import { ResponsavelDepartamento } from "../../../models/responsavelDepartamento";
import { DepartamentoService } from "src/app/services/departamento.service";
import { Component, OnInit } from "@angular/core";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { MensagemService } from "src/app/services/mensagem.service";
import { Router } from "@angular/router";
import { Funcionario } from "src/app/models/funcionario";
import { Departamento } from "src/app/models/departamento";
import { FormControl, Validators } from "@angular/forms";
import { ResponsavelDepartamentoService } from "src/app/services/responsavel-departamento.service";

@Component({
  selector: "app-reponsavel-departamento-create",
  templateUrl: "./responsavel-departamento-create.component.html",
  styleUrls: ["./responsavel-departamento-create.component.css"],
})
export class ResponsavelDepartamentoCreateComponent implements OnInit {
  responsavelDepartemento: ResponsavelDepartamento;

  funcionarios: Funcionario[] = [];
  departamentos: Departamento[] = [];

  funcionario: FormControl = new FormControl(null, [Validators.required]);
  departamento: FormControl = new FormControl(null, [Validators.required]);
  dataInicioResponsabilidade: FormControl = new FormControl(null, [
    Validators.required,
  ]);

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private responsavelDepartementoService: ResponsavelDepartamentoService,
    private mensagemService: MensagemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.responsavelDepartemento = new ResponsavelDepartamento();
    this.findAllDepartamentos();
    this.findAllFuncionarios();
  }

  create(): void {
    this.responsavelDepartementoService
      .create(this.responsavelDepartemento)
      .subscribe({
        next: (resposta) => {
          this.mensagemService.showSuccessoMensagem(
            "Responsavel Departamento Cadastrado com Sucesso"
          );
          this.router.navigate(["responsavelDepartamentos"]);
        },
        error: (ex) => {
          this.mensagemService.showErrorMensagem(ex.error.message);
        },
      });
  }

  findAllFuncionarios(): void {
    this.funcionarioService.findAll().subscribe((resposta) => {
      this.funcionarios = resposta;
    });
  }

  findAllDepartamentos(): void {
    this.departamentoService
      .findAllDepartamentoSemResponsavel()
      .subscribe((resposta) => {
        this.departamentos = resposta;
      });
  }

  validaCampos(): boolean {
    return (
      this.funcionario.valid &&
      this.dataInicioResponsabilidade.valid &&
      this.departamento.valid
    );
  }
}
