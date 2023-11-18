import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  hide = true;

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private mensagemService: MensagemService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  logar() {
    this.service.authenticate(this.creds).subscribe({
      next: resposta => {
        this.mensagemService.showSuccessoMensagem('Login Realizado com Sucesso');
        this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));
        this.router.navigate(['']);
      },
      error: () => {
        this.mensagemService.showErrorMensagem('Usuário e/ou senha inválidas');
      }
    });
  }
  
  validaCampos(): boolean {
    return !!(this.email.valid && this.senha.valid);
  }

  toggleVisualizarSenha(): void {
    this.hide = !this.hide;
  }
}
