import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { UserChangeService } from 'src/app/services/user-change-service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  roles: string[] = [];

  constructor(
    public usuarioService: UsuarioService,
    private authService: AuthService,
    private mensagemService: MensagemService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private userChangeService: UserChangeService,
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
    console.log(this.carregarDadosIniciais);
    this.userChangeService.userChanged$.subscribe(() => {
      this.carregarDadosIniciais();
    });
  }

  // Carrega as informações iniciais do usuário e suas funções
  private carregarDadosIniciais(): void {
    forkJoin([
      this.authService.getUserRoles(),
      this.usuarioService.obterDadosUsuario(),
    ]).subscribe({
      next: ([roles, usuario]) => {
        this.roles = roles;
        this.usuario = usuario;
        this.cdRef.markForCheck();
      },
      error: (error) => {
        this.mensagemService.showErrorMensagem(error.error.message);
      },
    });
  }

  // Realiza o logout do usuário
  logout(): void {
    this.router.navigate(["login"]);
    this.authService.logout();
    this.mensagemService.showSuccessoMensagem("Logout realizado com sucesso");
  }
}