import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinica } from 'src/app/models/clinica';
import { Pessoa } from 'src/app/models/pessoa';
import { Usuario } from 'src/app/models/usuario';
import { ClinicaService } from 'src/app/services/clinica.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: "app-usuario-update",
  templateUrl: "./usuario-update.component.html",
  styleUrls: ["./usuario-update.component.css"],
})
export class UsuarioUpdateComponent implements OnInit {
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
    private mensagemService: MensagemService,
    private clinicaService: ClinicaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.pessoa = new Pessoa();
    this.usuario.pessoa.nome = this.nome.value;
    this.usuario.pessoa.cpf = this.cpf.value;
    this.usuario.email = this.email.value;
    this.usuario.senha = this.senha.value;
    this.usuario.clinica = this.clinica.value;
    this.usuario.id = this.route.snapshot.paramMap.get("id");
    this.findById();
    this.findAllClinicas();
  }

  findById(): void {
    this.usuarioService.findById(this.usuario.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.usuario = resposta;
    });
  }

  update(): void {
    this.usuarioService.update(this.usuario).subscribe({
      next: () => {
        this.mensagemService.showSuccessoMensagem(
          "Usuário atualizado com sucesso"
        );
        this.router.navigate(["usuarios"]);
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

  findAllClinicas(): void {
    this.clinicaService.findAll().subscribe(resposta => {
      this.clinicas = resposta;
    })
  }

  addPerfil(perfil: any): void {
    if (this.usuario.perfis.includes(perfil)) {
      this.usuario.perfis.splice(this.usuario.perfis.indexOf(perfil), 1);
    } else {
      this.usuario.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return (
      this.nome.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.senha.valid &&
      this.clinica.valid &&
      this.confirmaSenha.valid &&
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

  compareClinicas(clinica1: any, clinica2: any): boolean {
    return clinica1 && clinica2 ? clinica1.id === clinica2.id : clinica1 === clinica2;
}
}

