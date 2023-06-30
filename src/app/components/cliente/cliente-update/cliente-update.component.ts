import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { EnderecoService } from 'src/app/services/endereco.service';


@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
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

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.required);
  rua: FormControl = new FormControl(null, Validators.required);
  bairro: FormControl = new FormControl(null, Validators.required);
  estado: FormControl = new FormControl(null, Validators.required);
  cidade: FormControl = new FormControl(null, Validators.required);
  cep: FormControl = new FormControl(null, Validators.required);
  numero: FormControl = new FormControl(null, Validators.required);

  constructor(
    private service: ClienteService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    private enderecoService: EnderecoService
    ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

   findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = []
      this.cliente = resposta;
      if (!this.cliente.endereco) {
        this.cliente.endereco = {
          rua: '',
          bairro: '',
          estado: '',
          cidade: '',
          cep: '',
          numero: ''
        };
      }
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso', 'Update');
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

  buscarEnderecoPorCep(): void {
    const cep = this.cep.value;
    this.enderecoService.buscaEnderecoPorCep(cep).subscribe((endereco) => {
      this.rua.setValue(endereco.logradouro);
      this.bairro.setValue(endereco.bairro);
      this.estado.setValue(endereco.uf);
      this.cidade.setValue(endereco.localidade);
    });
  }
}
