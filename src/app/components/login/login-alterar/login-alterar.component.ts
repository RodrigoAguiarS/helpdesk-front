import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecuperarSenha } from 'src/app/models/recuperarSenha';
import { AuthService } from 'src/app/services/auth.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-login-alterar',
  templateUrl: './login-alterar.component.html',
  styleUrls: ['./login-alterar.component.css']
})
export class LoginAlterarComponent implements OnInit {
  novaSenha = new FormControl(null, Validators.required);
  recuperarForm!: FormGroup;
  uidValido?: boolean;

  recuperarSenha: RecuperarSenha = {
    uid: '',
    novaSenha: ''
  };

  constructor(
    private mensagemService: MensagemService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid');
    if (uid !== null) {
      this.recuperarSenha.uid = uid;
    } else {
      this.mensagemService.showErrorMensagem('O parâmetro uid é nulo.');
    }

    this.recuperarForm = this.formBuilder.group({
      novaSenha: ['', Validators.required],
      confirmarSenha: ['',[this.confirmValidator]]
    });

    this.verificarUid();
  }

  verificarUid() {
    this.authService.verificarUid(this.recuperarSenha.uid).subscribe({
      next: (response) => {
        console.log('Resposta do verificarUid:', response);
        if (response) {
          this.uidValido = true;
          this.recuperarSenha.uid = response; // Atribuir o valor do uid retornado à variável uid do componente
        } else {
          this.uidValido = false;
        }
      },
      error: (error) => {
        this.mensagemService.showErrorMensagem('Erro na verificação do UID:');
        this.uidValido = false;
      }
    });
  }

  atualizarSenha() {
    if (this.recuperarForm.invalid) {
      this.mensagemService.showErrorMensagem('Por favor, preencha todos os campos corretamente.');
      return;
    }
    this.authService.atualizarSenha(this.recuperarSenha.uid, this.recuperarSenha.novaSenha).subscribe(
      (response) => {
        this.mensagemService.showSuccessoMensagem('Senha atualizada com sucesso.');
        this.router.navigate(['login']);
      },
      (error) => {
        this.mensagemService.showErrorMensagem('Erro ao atualizar a senha. Por favor, tente novamente.');
      }
    );
  }

  confirmValidator = (control: FormGroup): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.recuperarForm.controls['novaSenha'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  cancel(): void {
    this.router.navigate(['login']);
  }
}