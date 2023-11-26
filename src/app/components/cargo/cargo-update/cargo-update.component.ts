import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Departamento } from 'src/app/models/departamento';
import { CargoService } from 'src/app/services/cargo.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-cargo-update',
  templateUrl: './cargo-update.component.html',
  styleUrls: ['./cargo-update.component.css']
})
export class CargoUpdateComponent implements OnInit {

  cargo: Cargo;
  departamentos: Departamento[] = []

  // Definição dos formulários
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  descricao: FormControl = new FormControl(null, Validators.minLength(3));
  responsabilidades: FormControl = new FormControl(null, Validators.minLength(3));
  salarioBase: FormControl = new FormControl(null, Validators.required);
  departamento: FormControl = new FormControl(null, Validators.required);
  
  
  constructor(
    private departamentoService: DepartamentoService,
    private mensagemService: MensagemService,
    private route: ActivatedRoute,
    private cargoService: CargoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargo = new Cargo();
    this.cargo.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllDepartamentos();
  }

  findById(): void {
    this.cargoService.findById(this.cargo.id).subscribe((resposta) => {
      this.cargo = resposta;
    });
  }

  findAllDepartamentos(): void {
    this.departamentoService.findAll().subscribe(resposta => {
      this.departamentos = resposta;
    })
  }

  update(): void {
    this.cargoService.update(this.cargo).subscribe({
      next: (resposta) => {
        this.mensagemService.showSuccessoMensagem(
          "Cargo " + resposta.nome + " atualizado com sucesso"
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