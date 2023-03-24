import { LiderService } from './../../../services/lider.service';
import { Component, OnInit } from '@angular/core';
import { Lider } from 'src/app/models/lider';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EnderecoResponse } from 'src/app/models/enderecoResponse';

@Component({
  selector: 'app-lider-create',
  templateUrl: './lider-create.component.html',
  styleUrls: ['./lider-create.component.css']
})
export class LiderCreateComponent implements OnInit {

  public lider: Lider = {
    nome: '',
    email: '',
    celular: '',
    whatsapp: false,
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
  email: FormControl =        new FormControl(null, Validators.email);
  cep: FormControl = new FormControl(null, [ Validators.required,
    Validators.pattern(/^\d{5}-?\d{3}$/),
  ]);

  constructor(
    private service: LiderService,
    private toast:    ToastrService,
    private router:          Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.lider).subscribe(() => {
      this.toast.success('Lider cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['lideres'])
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
    && this.cep.valid
  }

  public buscaEnderecoPorCep(cep: string): void {
    this.http.get<EnderecoResponse>(`https://viacep.com.br/ws/${cep}/json/`).subscribe((endereco) => {
      this.lider.endereco.cep = endereco.cep;
      this.lider.endereco.rua = endereco.logradouro;
      this.lider.endereco.bairro = endereco.bairro;
      this.lider.endereco.cidade = endereco.localidade;
      this.lider.endereco.estado = endereco.uf;
      this.enderecoPreenchido = true;
    });
  }
}
