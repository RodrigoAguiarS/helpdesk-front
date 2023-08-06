import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnderecoResposta } from 'src/app/models/enderecoResposta';
import { Paciente } from 'src/app/models/paciente';
import { EnderecoService } from 'src/app/services/endereco.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-update',
  templateUrl: './paciente-update.component.html',
  styleUrls: ['./paciente-update.component.css']
})
export class PacienteUpdateComponent implements OnInit {

  public paciente: Paciente = {
    id: '',
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
  hide = true;

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
    private route:   ActivatedRoute,
    private enderecoService: EnderecoService
  ) { }

  ngOnInit(): void {
    this.paciente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

   findById(): void {
    this.pacienteService.findById(this.paciente.id).subscribe(resposta => {
      this.paciente = resposta;
    })
  }

  update(): void {
    this.pacienteService.update(this.paciente).subscribe(() => {
      this.toast.success('Paciente atualizado com sucesso', 'Update');
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
    && this.cep.valid && this.telefone.valid && this.cpf.valid &&
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

  checkPasswordMatch(): void {
    if (this.confirmaSenha.value !== this.paciente.senha && this.confirmaSenha.dirty) {
      this.toast.warning('As senhas não são iguais', 'Senha');
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}