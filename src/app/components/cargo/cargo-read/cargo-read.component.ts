import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/models/departamento';
import { DetalhesCargo } from 'src/app/models/detalhesCargo';
import { DetalhesResponsavel } from 'src/app/models/detalhesResponsavel';
import { CargoService } from 'src/app/services/cargo.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-cargo-read',
  templateUrl: './cargo-read.component.html',
  styleUrls: ['./cargo-read.component.css']
})
export class CargoReadComponent implements OnInit {

  cargo: DetalhesCargo;
  departamentos: Departamento[] = []

  constructor(
    private mensagemService: MensagemService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private cargoService: CargoService,
  ) {}

  ngOnInit(): void {
    this.cargo = new DetalhesCargo();
    this.cargo.responsavelAtual = new DetalhesResponsavel;
    this.cargo.departamento = new Departamento();
    this.cargo.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.cargoService.detalhesCargoById(this.cargo.id).subscribe({
      next: (resposta) => {
        this.cargo = resposta;
      },
      error: (ex) => {
        this.mensagemService.showErrorMensagem(ex.error.message);
      }
    });
  }

  findAllDepartamentos(): void {
    this.departamentoService.findAll().subscribe(resposta => {
      this.departamentos = resposta;
    })
  }
}
