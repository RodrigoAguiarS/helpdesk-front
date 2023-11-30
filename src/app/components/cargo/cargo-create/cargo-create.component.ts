import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Departamento } from 'src/app/models/departamento';
import { CargoService } from 'src/app/services/cargo.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.css']
})
export class CargoCreateComponent implements OnInit {

  cargo: Cargo;
  departamentos: Departamento[] = []

  constructor(
    private mensagemService: MensagemService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    private router: Router
  ) {}

  // Definição dos formulários
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  descricao: FormControl = new FormControl(null, [Validators.minLength(10), Validators.maxLength(255)]);
  responsabilidades: FormControl = new FormControl(null, [Validators.minLength(10), Validators.maxLength(255)]);
  salarioBase: FormControl = new FormControl(null, Validators.required);
  departamento: FormControl = new FormControl(null, Validators.required);

  ngOnInit(): void {
    this.cargo = new Cargo();
    this.findAllDepartamentos();
  }

  create(): void {
    // Preenchimento dos dados do departamento
    this.cargo.nome = this.nome.value;
    this.cargo.descricao = this.descricao.value;
    this.cargo.salarioBase = this.salarioBase.value;
    this.cargo.responsabilidades = this.responsabilidades.value;
    this.cargo.departamento = this.departamento.value;

    // Chamada do serviço para criar o usuário
    this.cargoService.create(this.cargo).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Cargo " + resposta.nome + " cadastrado com sucesso"
        );
        this.router.navigate(["cargos"]);
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

  findAllDepartamentos(): void {
    this.departamentoService.findAll().subscribe(resposta => {
      this.departamentos = resposta;
    })
  }

  // validacao de campos
  validaCampos(): boolean {
    return this.nome.valid && this.descricao.valid
    && this.responsabilidades.valid && this.salarioBase.valid
    && this.departamento.valid
  }

  compareDerpatamentos(derpatamento1: any, derpatamento2: any): boolean {
    return derpatamento1 && derpatamento2
      ? derpatamento1.id === derpatamento2.id
      : derpatamento1 === derpatamento2;
  }
}
