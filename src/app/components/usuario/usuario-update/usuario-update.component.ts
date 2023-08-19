import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  usuario: Usuario;
  hide = true;
  roles: string[] = [];

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  confirmaSenha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private usuarioService: UsuarioService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.nome = this.nome.value;
    this.usuario.cpf = this.cpf.value;
    this.usuario.email = this.email.value;
    this.usuario.senha = this.senha.value;
    this.usuario.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.usuarioService.findById(this.usuario.id).subscribe(resposta => {
      resposta.perfis = []
      this.usuario = resposta;
    })
  }

  update(): void {
    this.usuarioService.update(this.usuario).subscribe(() => {
      this.toast.success('Usuário atualizado com sucesso', 'Update');
      this.router.navigate(['home'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }


  addPerfil(perfil: any): void {
    if(this.usuario.perfis.includes(perfil)) {
      this.usuario.perfis.splice(this.usuario.perfis.indexOf(perfil), 1);
    } else {
      this.usuario.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid
     && this.email.valid && this.senha.valid
     && this.confirmaSenha.valid && this.senha.value === this.confirmaSenha.value 
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

