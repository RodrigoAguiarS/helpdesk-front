import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { RecuperarSenha } from '../../../models/recuperarSenha';

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
    private toast: ToastrService,
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
      console.log('O parâmetro uid é nulo.');
    }

    this.recuperarForm = this.formBuilder.group({
      novaSenha: ['', Validators.required],
      confirmarSenha: ['',[this.confirmValidator]]
    });

    this.verificarUid();
  }

  verificarUid() {
    this.authService.verificarUid(this.recuperarSenha.uid).subscribe(
      (response) => {
        console.log('Resposta do verificarUid:', response);
        if (response) {
          this.uidValido = true;
          this.recuperarSenha.uid = response; // Atribuir o valor do uid retornado à variável uid do componente
        } else {
          this.uidValido = false;
        }
      },
      (error) => {
        console.log('Erro na verificação do UID:', error);
        this.uidValido = false;
      }
    );
  }

  atualizarSenha() {
    if (this.recuperarForm.invalid) {
      this.toast.error('Por favor, preencha todos os campos corretamente.');
      return;
    }
    this.authService.atualizarSenha(this.recuperarSenha.uid, this.recuperarSenha.novaSenha).subscribe(
      (response) => {
        this.toast.success('Senha atualizada com sucesso.');
        this.router.navigate(['login']);
      },
      (error) => {
        this.toast.error('Erro ao atualizar a senha. Por favor, tente novamente.');
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
