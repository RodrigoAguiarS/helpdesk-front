import { EnderecoService } from './../../../services/endereco.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { EnderecoResposta } from 'src/app/models/enderecoResposta';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    nome: '',
    telefone: '',
    endereco: {
      rua: '',
      bairro: '',
      estado: '',
      cidade: '',
      cep: '',
      numero: ''
    },
    perfis: []
  };

  enderecoPreenchido: boolean = false;
  
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.required);
  cep: FormControl = new FormControl(null, Validators.required);
  numero: FormControl = new FormControl(null, Validators.required);


  constructor(
    private service: ClienteService,
    private toast:    ToastrService,
    private router:          Router,
    private enderecoService: EnderecoService
    ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['clientes'])
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

  addPerfil(perfil: any): void {
    if(this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }

  }

  validaCampos(): boolean {
    return this.nome.valid && this.cep.valid
    && this.numero.valid
  }

  buscarEnderecoPorCep(cep: string) {
    this.enderecoService.buscaEnderecoPorCep(cep).subscribe(
      (endereco: EnderecoResposta) => {
        this.cliente.endereco.cep = endereco.cep;
        this.cliente.endereco.rua = endereco.logradouro;
        this.cliente.endereco.bairro = endereco.bairro;
        this.cliente.endereco.cidade = endereco.localidade;
        this.cliente.endereco.estado = endereco.uf;
        this.enderecoPreenchido = true;
      },
      (error: any) => {
        this.enderecoPreenchido = false;
        this.toast.error("Cep pode está errado ou incompleto");
      }
    );
  }
}