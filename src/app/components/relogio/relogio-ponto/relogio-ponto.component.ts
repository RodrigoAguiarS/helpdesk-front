import { RelogioService } from './../../../services/relogio.service';
import { RegistroPonto } from './../../../models/RegistroPonto';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-relogio-ponto',
  templateUrl: './relogio-ponto.component.html',
  styleUrls: ['./relogio-ponto.component.css']
})
export class RelogioPontoComponent implements OnInit {

  hora: Date = new Date();
  registrado: boolean;

  registro: RegistroPonto= {
    observacoes:  '',
    pontoRegistrado: false,
  }

  dataAtual: Date = new Date();

  observacoes: FormControl =  new FormControl(null, Validators.minLength(1));

  constructor(
    private service: RelogioService,
    private toast:    ToastrService,
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
        // Lógica para registrar a entrada do funcionário
        // Exemplo de implementação:
        this.service.registrarPonto(registro).subscribe((ponto) => {
          this.toast.success('Entrada registrada com sucesso:');
          console.log(registro.observacoes)
          console.log('Entrada registrada com sucesso:', ponto);
          this.registrado = true;
        }, (error) => {
          this.toast.error('Erro ao registrar entrada:', error);
        });
      } else {
        // Lógica para registrar a saída do funcionário
        // Exemplo de implementação:
        this.service.registrarPonto(registro).subscribe((ponto) => {
          this.toast.success('Saída registrada com sucesso:');
          console.log('Saída registrada com sucesso:', ponto);
          this.registrado = false;
        }, (error) => {
          this.toast.error('Erro ao registrar saída:', error);
        });
      }
    }
    validaCampos(): boolean {
      return this.observacoes.valid
    }
  }
