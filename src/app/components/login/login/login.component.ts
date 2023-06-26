import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.toast.success('Login realizado com sucesso!');
      this.service.sucessFulLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate(['']);
    }, (error) => {
      console.log(error)
      this.toast.error('Usuário e/ou senha inválidas');
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid ? true : false;
  }
}
