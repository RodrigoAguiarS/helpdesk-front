import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { forkJoin } from "rxjs";
import { Router } from "@angular/router";
import { RefreshTokenResponse } from "src/app/models/refreshTokenResponse";
import { UserChangeService } from "src/app/services/user-change-service";
import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "./../../models/usuario";
import { MensagemService } from "src/app/services/mensagem.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  roles: string[] = [];
  usuarioTrocado: boolean = false;
  usuarioLogado: Usuario;
  loginComoUsuario: string = "";

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
        this.usuarioLogado = usuario;
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

  // Realiza o login como outro usuário
  logarComoUsuario(): void {
    if (this.loginComoUsuario) {
      this.authService.executarAcaoComoUsuario(this.loginComoUsuario).subscribe({
        next: (response) => {
          this.mensagemService.showSuccessoMensagem(response.message);
          this.usuarioTrocado = true;
          this.authService
            .trocarTokenComNovoUsuario(this.loginComoUsuario)
            .subscribe({
              next: (refreshTokenResponse: RefreshTokenResponse) => {
                localStorage.setItem("token", refreshTokenResponse.newToken);
                this.atualizarInformacoesUsuario(refreshTokenResponse.newToken);
                this.router.navigate(['home']);
              },
              error: (error) => {
                this.mensagemService.showErrorMensagem(error.error.message);
              },
            });
        },
        error: (error) => {
          this.mensagemService.showErrorMensagem(error.error.message);
          this.loginComoUsuario = "";
        },
      });
    }
  }

  // Volta ao usuário original após o login temporário
  voltarAoUsuarioAnterior(): void {
    if (this.usuarioLogado) {
      this.authService
        .trocarTokenComNovoUsuario(this.usuarioLogado.email)
        .subscribe({
          next: (refreshTokenResponse: RefreshTokenResponse) => {
            localStorage.setItem("token", refreshTokenResponse.newToken);
            this.usuarioTrocado = false;
            this.mensagemService.showSuccessoMensagem(
              "Volta ao Usuário Original com sucesso!"
            );
            this.atualizarInformacoesUsuario(refreshTokenResponse.newToken);
            this.router.navigate(['home']);
          },
          error: (error) => {
            this.mensagemService.showErrorMensagem(error.error.message);
          },
        });
    }
  }

  // Atualiza as informações do usuário com base no token
  private atualizarInformacoesUsuario(token: string): void {
    this.usuarioService.getUserInfo(token).subscribe({
      next: (userInfo: Usuario) => {
        this.usuario = userInfo;
        this.cdRef.markForCheck();
        this.userChangeService.notifyUserChanged();
      },
      error: (error) => {
        this.mensagemService.showErrorMensagem(error.error.message);
      },
    });
  }
  // Alterna entre logar e deslogar como usuário
  toggleLogarDeslogar(): void {
    if (this.usuarioTrocado) {
      this.voltarAoUsuarioAnterior();
      this.loginComoUsuario = "";
    } else {
      this.logarComoUsuario();
    }
  }
}
