import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-recuperar',
  templateUrl: './login-recuperar.component.html',
  styleUrls: ['./login-recuperar.component.css']
})
export class LoginRecuperarComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);

  constructor(private toast: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  recuperarSenha() {
    if (this.email.valid) {
      const email = this.email.value;
      this.authService.recuperarSenha(email).subscribe(
        (response: string) => {
          console.log(response); // Imprime a resposta no console para análise
          this.toast.success("Link de recuperação de senha enviado para o email.");
          this.router.navigate(['login']);
        },
        (error) => {
          console.error(error); // Imprime o erro no console para análise
          this.toast.error("Erro ao enviar o email de recuperação de senha: " + error.message);
        }
      );
    }
  }

  validaCampos(): boolean {
    return this.email.valid ? true : false;
  }

  cancel(): void {
    this.router.navigate(['login']);
  }
}
