import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-login-recuperar',
  templateUrl: './login-recuperar.component.html',
  styleUrls: ['./login-recuperar.component.css']
})
export class LoginRecuperarComponent implements OnInit {

  creds: Credenciais

  email = new FormControl(null, Validators.email);

  constructor(private mensagemService: MensagemService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.creds = { email: '', senha: '' };
  }

  recuperarSenha() {
    if (this.email.valid) {
      const email = this.email.value;
      this.authService.recuperarSenha(email).subscribe({
        next: (response: string) => {
          console.log(response)
          this.mensagemService.showSuccessoMensagem("Link de recuperação de senha enviado para o email.");
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.mensagemService.showErrorMensagem("Erro ao enviar o email de recuperação de senha: " + error.message);
        }
      });
    }
  }

  validaCampos(): boolean {
    return !!this.email.valid;
  }

  cancel(): void {
    this.router.navigate(['login']);
  }
}