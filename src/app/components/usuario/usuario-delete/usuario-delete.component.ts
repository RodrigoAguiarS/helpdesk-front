import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { MensagemService } from 'src/app/services/mensagem.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

  usuario?: Usuario;

  constructor(
    private usuarioservice: UsuarioService,
    private mensagemService:    MensagemService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.usuarioservice.findById(this.usuario.id).subscribe(resposta => {
      resposta.perfis = []
      this.usuario = resposta;
    })
  }

  delete(): void {
    this.usuarioservice.delete(this.usuario.id).subscribe(() => {
      this.mensagemService.showSuccessoMensagem('Usuário deletado com sucesso');
      this.router.navigate(['usuarios'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.mensagemService.showErrorMensagem(element.message);
        });
      } else {
        this.mensagemService.showErrorMensagem(ex.error.message);
      }
    })
  }
}

