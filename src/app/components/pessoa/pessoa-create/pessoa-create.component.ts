import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/models/endereco';
import { Pessoa } from 'src/app/models/pessoa';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EnderecoService } from 'src/app/services/endereco.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoa-create',
  templateUrl: './pessoa-create.component.html',
  styleUrls: ['./pessoa-create.component.css']
})
export class PessoaCreateComponent implements OnInit {

  usuario: Usuario;
  hide = true;
  roles: string[] = [];
  enderecoPreenchido: boolean = false;

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  dataNascimento: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.required);
  cpf: FormControl = new FormControl(null, Validators.required);
  sexo: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  cep: FormControl = new FormControl(null, Validators.required);
  numero: FormControl = new FormControl(null, Validators.required);
  confirmaSenha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private usuarioService: PessoaService,
    private authService: AuthService,
    private mensagemService: MensagemService,
    private enderecoService: EnderecoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
    this.usuario.pessoa.endereco = new Endereco();
    this.usuario.perfis = [];
    this.authService.getUserRoles().subscribe({
      next: (roles: string[]) => {
        this.roles = roles;
      },
      error: (error) => {
        this.mensagemService.showErrorMensagem(error.error.message)
      }
    });
  }

  create(): void {
    this.usuario.pessoa.nome = this.nome.value;
    this.usuario.pessoa.cpf = this.cpf.value;
    this.usuario.email = this.email.value;
    this.usuario.senha = this.senha.value;
    this.usuario.pessoa.dataNascimento = this.dataNascimento.value;
    this.usuario.pessoa.telefone = this.telefone.value
    this.usuario.pessoa.sexo = this.sexo.value
    this.usuario.pessoa.endereco.cep = this.cep.value
    this.usuario.pessoa.endereco.numero = this.numero.value
    
    this.usuarioService.create(this.usuario).subscribe({
      next: (resposta) => {
        console.log("aqui a resposta " + resposta );
        this.mensagemService.showSuccessoMensagem("Usuário cadastrado com sucesso");
        this.router.navigate(["home"]);
      },
      error: (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.mensagemService.showErrorMensagem(element.message);
          });
        } else {
          this.mensagemService.showErrorMensagem(ex.error.message);
        }
      }
    });
  }

  validaCampos(): boolean {
    return (
      this.nome.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.senha.valid &&
      this.dataNascimento.valid &&
      this.telefone.valid &&
      this.sexo.valid &&
      this.cep.valid &&
      this.numero.valid &&
      this.confirmaSenha.valid &&
      this.senha.value === this.confirmaSenha.value
    );
  }

  checkPasswordMatch(): void {
    if (
      this.confirmaSenha.value !== this.usuario.senha &&
      this.confirmaSenha.dirty
    ) {
      this.mensagemService.showErrorMensagem("As senhas não são iguais");
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }


  retornaStatus(status: boolean): string {
    return status ? "ATIVO" : "NÃO ATIVO";
  }


  addPerfil(perfil: any): void {
    if(this.usuario.perfis.includes(perfil)) {
      this.usuario.perfis.splice(this.usuario.perfis.indexOf(perfil), 1);
    } else {
      this.usuario.perfis.push(perfil);
    }
  }

  buscarEnderecoPorCep(): void {
    const cep = this.cep.value;
    this.enderecoService.buscaEnderecoPorCep(cep).subscribe(
      (endereco) => {
        if (endereco.bairro) {
          this.usuario.pessoa.endereco.cep = endereco.cep;
          this.usuario.pessoa.endereco.rua = endereco.logradouro;
          this.usuario.pessoa.endereco.bairro = endereco.bairro;
          this.usuario.pessoa.endereco.cidade = endereco.localidade;
          this.usuario.pessoa.endereco.estado = endereco.uf;
          this.mensagemService.showSuccessoMensagem("Endereço Preenchido com Sucesso");
          this.enderecoPreenchido = true;
        } else {
          this.enderecoPreenchido = false;
          this.mensagemService.showErrorMensagem("Endereço não encontrado para o CEP informado.");
          this.limparCampos();
        }
      },
      (erro) => {
        this.mensagemService.showErrorMensagem("Cep Inváliado realize a buscar novamente");
        this.enderecoPreenchido = false;
        this.limparCampos();
      }
    );
  }

  limparCampos(): void {
    this.usuario.pessoa.endereco.cep = null;
    this.usuario.pessoa.endereco.rua = null;
    this.usuario.pessoa.endereco.bairro = null;
    this.usuario.pessoa.endereco.cidade = null;
    this.usuario.pessoa.endereco.estado = null;
  }
}