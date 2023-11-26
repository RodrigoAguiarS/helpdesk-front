import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/departamento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';
import { DetalhesResponsavel } from 'src/app/models/detalhesResponsavel';

@Component({
  selector: 'app-departamento-read',
  templateUrl: './departamento-read.component.html',
  styleUrls: ['./departamento-read.component.css']
})
export class DepartamentoReadComponent implements OnInit {

  departamento: Departamento;

  constructor(
    private departamentoService: DepartamentoService,
    private mensagemService: MensagemService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.departamento = new Departamento();
    this.departamento.responsavelAtual = new DetalhesResponsavel();
    this.departamento.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.departamentoService.findResponsavelAtualByDepartamento(this.departamento.id).subscribe({
      next: (resposta) => {
        this.departamento = resposta;
      },
      error: (ex) => {
        this.mensagemService.showErrorMensagem(ex.error.message);
      }
    });
  }
}
