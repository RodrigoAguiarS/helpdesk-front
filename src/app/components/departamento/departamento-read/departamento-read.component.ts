import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/departamento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';

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
    this.departamento.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.departamentoService.findById(this.departamento.id).subscribe(resposta => {
      this.departamento = resposta;
    }, ex => {
      this.mensagemService.showErrorMensagem(ex.error.error);
    })
  }
}
