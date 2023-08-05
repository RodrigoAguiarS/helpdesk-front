import { EnderecoService } from './../../../services/endereco.service';
import { Paciente } from './../../../models/paciente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnderecoResposta } from 'src/app/models/enderecoResposta';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css']
})
export class PacienteCreateComponent implements OnInit {

  public paciente: Paciente = {
    id: 0,
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    telefone: '',
    perfis:     [],
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  };

  enderecoPreenchido = false;

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  cep: FormControl = new FormControl(null, [ Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/),]);
  telefone: FormControl = new FormControl(null, Validators.required);
  confirmaSenha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private pacienteService: PacienteService,
    private toast:    ToastrService,
    private router:          Router,
    private enderecoService: EnderecoService
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.pacienteService.create(this.paciente).subscribe(() => {
      this.toast.success('paciente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['pacientes'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.email.valid 
    && this.cep.valid && this.telefone.valid &&
    this.telefone.valid && this.senha.value === this.confirmaSenha.value 
  }

  buscaEnderecoPorCep(cep: string) {
    this.enderecoService.buscaEnderecoPorCep(cep).subscribe(
      (endereco: EnderecoResposta) => {
        this.paciente.endereco.cep = endereco.cep;
        this.paciente.endereco.rua = endereco.logradouro;
        this.paciente.endereco.bairro = endereco.bairro;
        this.paciente.endereco.cidade = endereco.localidade;
        this.paciente.endereco.estado = endereco.uf;
        this.enderecoPreenchido = true;
      },
      (error: any) => {
        this.enderecoPreenchido = false;
        this.toast.error("Cep pode está errado ou incompleto");
      }
    );
  }
}

