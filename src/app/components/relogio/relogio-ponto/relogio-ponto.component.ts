import { TableService } from './../../../services/table.service';
import { RelogioService } from './../../../services/relogio.service';
import { RegistroPonto } from '../../../models/RegistroPonto';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoModalComponent } from '../../modal/confirmacao-modal-component/confirmacao-modal-component.component';

@Component({
  selector: 'app-relogio-ponto',
  templateUrl: './relogio-ponto.component.html',
  styleUrls: ['./relogio-ponto.component.css']
})
export class RelogioPontoComponent implements OnInit {

  hora: Date = new Date();
  registrado: boolean;

  listarRegistros: boolean = false;

  registro: RegistroPonto = {
    observacoes: '',
    pontoRegistrado: false,
  };

  dataAtual: Date = new Date();

  observacoes: FormControl =  new FormControl(null, Validators.minLength(1));

  constructor(
    private pdf: TableService,
    private service: RelogioService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.dataAtual = new Date();
      this.hora = new Date();
    }, 1000);
    this.service.consultarUltimoPonto().subscribe((ponto) => {
      this.registrado = ponto;
    }, (error) => {
      console.log(error);
    });
  }

  registrarPonto() {
    const registro: RegistroPonto = {
      observacoes: this.registro.observacoes,
      pontoRegistrado: this.registro.pontoRegistrado
    }
    
    if (!this.registrado) {
      this.service.registrarPonto(registro).subscribe((ponto) => {
        this.toast.success('Entrada registrada com sucesso:');
        this.registrado = true;
        this.dialog.open(ConfirmacaoModalComponent, {
          width: '300px',
          data: { mensagem: 'Deseja gerar o PDF do ponto registrado?' }
        }).afterClosed().subscribe(result => {
          if (result) {
            this.gerarPdfPonto(registro);
          }
        });
      }, (error) => {
        this.toast.error('Erro ao registrar entrada:', error);
      });
    } else {
      this.service.registrarPonto(registro).subscribe((ponto) => {
        this.toast.success('Saída registrada com sucesso:');
        console.log('Saída registrada com sucesso:', ponto);
        this.registrado = false;
        this.dialog.open(ConfirmacaoModalComponent, {
          width: '300px',
          data: { mensagem: 'Deseja gerar o PDF do ponto registrado?' }
        }).afterClosed().subscribe(result => {
          if (result) {
            this.gerarPdfPonto(registro);
          }
        });
      }, (error) => {
        this.toast.error('Erro ao registrar saída:', error);
      });
    }
  }

  gerarPdfPonto(registro: RegistroPonto) {
  registro.pontoRegistrado = this.registrado;
  registro.observacoes = this.observacoes.value;
    this.pdf.gerarPdf(registro).subscribe((pdf) => {
      this.toast.success('PDF do ponto registrado gerado com sucesso.');
    }, (error) => {
      this.toast.error('Erro ao gerar PDF do ponto registrado:', error);
    });
  }

  validaCampos(): boolean {
    return this.observacoes.valid
  }
}