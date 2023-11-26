import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Departamento } from "src/app/models/departamento";
import { Funcionario } from "src/app/models/funcionario";
import { ResponsavelDepartamento } from "src/app/models/responsavelDepartamento";
import { DepartamentoService } from "src/app/services/departamento.service";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { MensagemService } from "src/app/services/mensagem.service";
import { ResponsavelDepartamentoService } from "src/app/services/responsavel-departamento.service";

@Component({
  selector: "app-responsavel-departamento-update",
  templateUrl: "./responsavel-departamento-update.component.html",
  styleUrls: ["./responsavel-departamento-update.component.css"],
})
export class ResponsavelDepartamentoUpdateComponent implements OnInit {
  responsavelDepartemento: ResponsavelDepartamento;

  funcionarios: Funcionario[] = [];
  departamentos: Departamento[] = [];

  funcionario: FormControl = new FormControl(null, [Validators.required]);
  departamento: FormControl = new FormControl(null, [Validators.required]);
  dataInicioResponsabilidade: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private responsavelDepartementoService: ResponsavelDepartamentoService,
    private mensagemService: MensagemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.responsavelDepartemento = new ResponsavelDepartamento();
    this.responsavelDepartemento.id = this.route.snapshot.paramMap.get("id");
    this.findAllDepartamentos();
    this.findAllFuncionarios();
    this.findById();
  }

  findById(): void {
    this.responsavelDepartementoService
      .findById(this.responsavelDepartemento.id)
      .subscribe((resposta) => {
        this.responsavelDepartemento = resposta;
      });
  }

  update(): void {
    this.responsavelDepartementoService
      .update(this.responsavelDepartemento)
      .subscribe({
        next: () => {
          this.mensagemService.showSuccessoMensagem(
            "Responsável pelo Departamento foi atualizado com sucesso"
          );
          this.router.navigate(["responsavelDepartamentos"]);
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

  // Validação dos campos do formulário
  validaCampos(): boolean {
    return this.departamento.valid && this.funcionario.valid;
  }

  compareFuncionarios(funcionario1: any, funcionario2: any): boolean {
    return funcionario1 && funcionario2
      ? funcionario1.id === funcionario2.id
      : funcionario1 === funcionario2;
  }

  compareDerpatamentos(derpatamento1: any, derpatamento2: any): boolean {
    return derpatamento1 && derpatamento2
      ? derpatamento1.id === derpatamento2.id
      : derpatamento1 === derpatamento2;
  }
}
