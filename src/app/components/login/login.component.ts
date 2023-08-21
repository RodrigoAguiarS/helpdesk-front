import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
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
        this.mensagemService.showErrorMensagem('Login Realizado com Sucesso');
        this.service.sucessFulLogin(resposta.headers.get('Authorization').substring(7));
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
}
