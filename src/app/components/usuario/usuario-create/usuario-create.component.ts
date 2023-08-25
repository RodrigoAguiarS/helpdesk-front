import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clinica } from 'src/app/models/clinica';
import { Pessoa } from 'src/app/models/pessoa';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: "app-usuario-create",
  templateUrl: "./usuario-create.component.html",
  styleUrls: ["./usuario-create.component.css"],
})
export class UsuarioCreateComponent implements OnInit {

  usuario: Usuario;
  hide = true;
  roles: string[] = [];
  clinicas: Clinica[] = []

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  confirmaSenha: FormControl = new FormControl(null, Validators.minLength(3));
  clinica: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private clinicaService: ClinicaService,
    private mensagemService: MensagemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllClinicas();
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
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

  findAllClinicas(): void {
    this.clinicaService.findAll().subscribe(resposta => {
      this.clinicas = resposta;
    })
  }

  create(): void {
    this.usuario.pessoa.nome = this.nome.value;
    this.usuario.pessoa.cpf = this.cpf.value;
    this.usuario.email = this.email.value;
    this.usuario.senha = this.senha.value;
    
    this.usuarioService.create(this.usuario).subscribe({
      next: (resposta) => {
        console.log(resposta);
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
      this.confirmaSenha.valid &&
      this.clinica.valid &&
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
}
