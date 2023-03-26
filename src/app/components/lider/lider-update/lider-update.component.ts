import { LiderService } from './../../../services/lider.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Lider } from 'src/app/models/lider';
import { EnderecoResponse } from 'src/app/models/enderecoResponse';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lider-update',
  templateUrl: './lider-update.component.html',
  styleUrls: ['./lider-update.component.css']
})
export class LiderUpdateComponent implements OnInit {

  public lider: Lider = {
    id:  '',
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

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  email: FormControl =        new FormControl(null, Validators.email);
  celular: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: LiderService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    private http: HttpClient
    ) { }

    ngOnInit(): void {
      this.lider.id = this.route.snapshot.paramMap.get('id');
      this.findById();
     }
  
    findById(): void {
      this.service.findById(this.lider.id).subscribe(resposta => {
        this.lider = resposta;
      })
    }
  
    update(): void {
      this.service.update(this.lider).subscribe(() => {
        this.toast.success('Lider atualizado com sucesso', 'Update');
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
      && this.celular.valid
    }

    public buscaEnderecoPorCep(cep: string): void {
      this.http.get<EnderecoResponse>(`https://viacep.com.br/ws/${cep}/json/`).subscribe((endereco) => {
        this.lider.endereco.cep = endereco.cep;
        this.lider.endereco.rua = endereco.logradouro;
        this.lider.endereco.bairro = endereco.bairro;
        this.lider.endereco.cidade = endereco.localidade;
        this.lider.endereco.estado = endereco.uf;
      });
    }
  }
