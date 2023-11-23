import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Endereco } from "src/app/models/endereco";
import { Pessoa } from "src/app/models/pessoa";
import { Usuario } from "src/app/models/usuario";
import { EnderecoService } from "src/app/services/endereco.service";
import { MensagemService } from "src/app/services/mensagem.service";
import { PessoaService } from "src/app/services/pessoa.service";
import { UserChangeService } from "src/app/services/user-change-service";

@Component({
  selector: "app-pessoa-update",
  templateUrl: "./pessoa-update.component.html",
  styleUrls: ["./pessoa-update.component.css"],
})
export class PessoaUpdateComponent implements OnInit {

  usuario: Usuario;
  hide = true;
  roles: string[] = [];
  
  enderecoPreenchido: boolean = false;

  // Definição dos formulários
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  dataNascimento: FormControl = new FormControl(null, Validators.required);
  telefone: FormControl = new FormControl(null, Validators.required);
  cpf: FormControl = new FormControl(null, Validators.required);
  sexo: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  cep: FormControl = new FormControl(null, Validators.required);
  numero: FormControl = new FormControl(null, Validators.minLength(1));
  confirmaSenha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private pessoaService: PessoaService,
    private mensagemService: MensagemService,
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private router: Router,
    private userChangeService: UserChangeService
  ) {}

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
    this.usuario.pessoa.endereco = new Endereco();
    this.usuario.pessoa.nome = this.nome.value;
    this.usuario.pessoa.cpf = this.cpf.value;
    this.usuario.email = this.email.value;
    this.usuario.senha = this.senha.value;
    this.usuario.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.pessoaService.findById(this.usuario.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.usuario = resposta;
    });
  }

  // adiciona perfil ao usuário
  update(): void {
    this.pessoaService.update(this.usuario).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Pessoa atualizado com sucesso"
        );
        this.userChangeService.notifyUserChanged();
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
      },
    });
  }

  // adiciona perfil ao usuário
  addPerfil(perfil: any): void {
    if (this.usuario.perfis.includes(perfil)) {
      this.usuario.perfis.splice(this.usuario.perfis.indexOf(perfil), 1);
    } else {
      this.usuario.perfis.push(perfil);
    }
  }

  // Validação dos campos do formulário
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

  // Validação de solos
  checkPasswordMatch(): void {
    if (
      this.confirmaSenha.value !== this.usuario.senha &&
      this.confirmaSenha.dirty
    ) {
      this.mensagemService.showErrorMensagem("As senhas não são iguais");
    }
  }

  // visualizar senha
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  retornaStatus(status: boolean): string {
    return status ? "ATIVO" : "NÃO ATIVO";
  }

  // busca o endereco pelo cep passado
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
        this.mensagemService.showErrorMensagem("Cep Inváliado realize a buscar novamente" + erro);
        this.enderecoPreenchido = false;
        this.limparCampos();
      }
    );
  }

   // metodo de limpar os campos
   limparCampos(): void {
    this.usuario.pessoa.endereco.cep = null;
    this.usuario.pessoa.endereco.rua = null;
    this.usuario.pessoa.endereco.bairro = null;
    this.usuario.pessoa.endereco.cidade = null;
    this.usuario.pessoa.endereco.estado = null;
  }
}
