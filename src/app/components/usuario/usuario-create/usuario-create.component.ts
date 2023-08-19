import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
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

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  confirmaSenha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.authService.getUserRoles().subscribe(
      (roles: string[]) => {
        this.roles = roles;
      },
      (error) => {
        // Trate o erro, se necessário
      }
    );
  }
  

  create(): void {
    this.usuario.nome = this.nome.value;
    this.usuario.cpf = this.cpf.value;
    this.usuario.email = this.email.value;
    this.usuario.senha = this.senha.value;
    this.usuarioService.create(this.usuario).subscribe(
      (resposta) => {
        console.log(resposta);
        this.toast.success("Usuário cadastrado com sucesso", "Cadastro");
        this.router.navigate(["usuarios"]);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }

  validaCampos(): boolean {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }

  checkPasswordMatch(): void {
    if (
      this.confirmaSenha.value !== this.usuario.senha &&
      this.confirmaSenha.dirty
    ) {
      this.toast.warning("As senhas não são iguais", "Senha");
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
