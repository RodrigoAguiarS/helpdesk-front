import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargo';
import { Endereco } from 'src/app/models/endereco';
import { EnderecoResposta } from 'src/app/models/enderecoReposta';
import { Pessoa } from 'src/app/models/pessoa';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CargoService } from 'src/app/services/cargo.service';
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
  cargos: Cargo[] = [];
  
  enderecoPreenchido: boolean = false;
  

  // Definição dos formulários
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  dataNascimento: FormControl = new FormControl(null, Validators.required);
  dataEntrada: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.required);
  cpf: FormControl = new FormControl(null, Validators.required);
  sexo: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  cep: FormControl = new FormControl(null, Validators.required);
  numero: FormControl = new FormControl(null, Validators.required);
  cargo: FormControl = new FormControl(null, Validators.required);
  confirmaSenha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private usuarioService: PessoaService,
    private authService: AuthService,
    private cargoService: CargoService,
    private mensagemService: MensagemService,
    private enderecoService: EnderecoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
   // Inicialização do usuário e obtenção de papéis
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
    this.usuario.pessoa.endereco = new Endereco();
    this.usuario.perfis = [];
    this.findAllCargos();
    this.authService.getUserRoles().subscribe({
      next: (roles: string[]) => {
        this.roles = roles;
      },
      error: (error) => {
        this.mensagemService.showErrorMensagem(error.error.message)
      }
    });
  }

   // Criação de um novo usuário
  create(): void {
    // Preenchimento dos dados do usuário
    this.usuario.pessoa.nome = this.nome.value;
    this.usuario.pessoa.cpf = this.cpf.value;
    this.usuario.email = this.email.value;
    this.usuario.pessoa.dataNascimento = this.dataNascimento.value;
    this.usuario.pessoa.telefone = this.telefone.value
    this.usuario.pessoa.sexo = this.sexo.value
    this.usuario.pessoa.endereco.cep = this.cep.value
    this.usuario.pessoa.endereco.numero = this.numero.value
    this.usuario.cargo = this.cargo.value
    this.usuario.dataEntrada = this.dataEntrada.value
    
    // Chamada do serviço para criar o usuário
    this.usuarioService.create(this.usuario).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem("Usuário " 
        + this.usuario.pessoa?.nome + " cadastrado com sucesso");
        this.router.navigate(["pessoas"]);
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

  // Validação dos campos do formulário
  validaCampos(): boolean {
    return (
      this.nome.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.dataNascimento.valid &&
      this.telefone.valid &&
      this.sexo.valid &&
      this.dataEntrada &&
      this.cargo &&
      this.cep.valid &&
      this.numero.valid
    );
  }

    // Retorna o status formatado
  retornaStatus(status: boolean): string {
    return status ? "ATIVO" : "NÃO ATIVO";
  }


  // Adiciona ou remove um perfil da lista de perfis do usuário
  addPerfil(perfil: any): void {
    if(this.usuario.perfis.includes(perfil)) {
      this.usuario.perfis.splice(this.usuario.perfis.indexOf(perfil), 1);
    } else {
      this.usuario.perfis.push(perfil);
    }
  }

  // busca o endereco pelo cep passado
  buscarEnderecoPorCep(): void {
    const cep = this.cep.value;
    this.enderecoService.buscaEnderecoPorCep(cep).subscribe({
      next: (endereco: EnderecoResposta) => {
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
      error: (erro) => {
        this.mensagemService.showErrorMensagem("Cep Inválido. Realize a busca novamente.");
        this.enderecoPreenchido = false;
        this.limparCampos();
      }
    });
  }
  

  // metodo de limpar os campos
  limparCampos(): void {
    this.usuario.pessoa.endereco.cep = null;
    this.usuario.pessoa.endereco.rua = null;
    this.usuario.pessoa.endereco.bairro = null;
    this.usuario.pessoa.endereco.cidade = null;
    this.usuario.pessoa.endereco.estado = null;
  }

  findAllCargos(): void {
    this.cargoService.findAll().subscribe((resposta) => {
      this.cargos = resposta;
    });
  }

  compareCargos(cargo1: any, cargo2: any): boolean {
    return cargo1 && cargo2
      ? cargo1.id === cargo2.id
      : cargo1 === cargo2;
  }
}