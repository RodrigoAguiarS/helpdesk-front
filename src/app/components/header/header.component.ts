import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "./../../models/usuario";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Observable, forkJoin } from "rxjs";
import { Router } from "@angular/router";
import { RefreshTokenResponse } from "src/app/models/refreshTokenResponse";
import { UserChangeService } from "src/app/services/user-change-service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  usuarios: Usuario[] = [];
  roles: string[] = [];
  loginComoUsuario: string = "";
  usuarioTrocado: boolean = false;
  usuarioLogado: Usuario;

  constructor(
    public usuarioService: UsuarioService,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private userChangeService: UserChangeService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.authService.getUserRoles(),
      this.usuarioService.obterDadosUsuario(),
    ]).subscribe(
      ([roles, usuario]) => {
        this.roles = roles;
        this.usuario = usuario;
        this.usuarioLogado = usuario;
      },
      (error) => {
        this.toast.error(
          "Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.",
          "Erro"
        );
      }
    );
  }

  logout() {
    this.router.navigate(["login"]);
    this.authService.logout();
    this.toast.info("Logout realizado com sucesso", "Logout", {
      timeOut: 7000,
    });
  }

  logarComoUsuario(): void {
    if (this.loginComoUsuario) {
      this.authService.impersonateUser(this.loginComoUsuario).subscribe(
        (response) => {
          console.log(
            "Resposta da solicitação de login como usuário:",
            response
          );
          this.toast.success("Login como usuário bem-sucedido!");
          this.usuarioTrocado = true;

          this.authService
            .trocarTokenComNovoUsuario(this.loginComoUsuario)
            .subscribe(
              (refreshTokenResponse: RefreshTokenResponse) => {
                console.log(
                  "Resposta da troca de token:",
                  refreshTokenResponse
                );
                localStorage.setItem("token", refreshTokenResponse.newToken);
                console.log("Token atualizado:", refreshTokenResponse.newToken);

                // Obter as informações do usuário com base no novo token
                this.usuarioService
                  .getUserInfo(refreshTokenResponse.newToken)
                  .subscribe(
                    (userInfo: Usuario) => {
                      this.usuario = userInfo;
                      this.cdRef.markForCheck();
                      this.userChangeService.notifyUserChanged();
                    },
                    (error) => {
                      console.error(
                        "Erro ao obter as informações do usuário:",
                        error
                      );
                    }
                  );
              },
              (error) => {
                console.error("Erro ao trocar o token:", error);
              }
            );
        },
        (error) => {
          console.error("Erro ao logar como usuário:", error);
          this.toast.error(
            "Ocorreu um erro ao logar como usuário.",
            error.message
          );
        }
      );
    }
  }

  voltarAoUsuarioAnterior(): void {
    console.log("Tentando voltar ao usuário anterior...");

    if (this.usuarioLogado) {
      console.log("Usuário atual encontrado:", this.usuarioLogado);

      this.authService
        .trocarTokenComNovoUsuario(this.usuarioLogado.email)
        .subscribe(
          (refreshTokenResponse: RefreshTokenResponse) => {
            console.log("Resposta da troca de token:", refreshTokenResponse);

            localStorage.setItem("token", refreshTokenResponse.newToken);
            this.usuarioTrocado = false;
            console.log("Token atualizado:", refreshTokenResponse.newToken);

            // Obter as informações do usuário com base no novo token
            this.usuarioService
              .getUserInfo(refreshTokenResponse.newToken)
              .subscribe(
                (userInfo: Usuario) => {
                  console.log("Informações do usuário obtidas:", userInfo);
                  this.usuario = userInfo;
                  this.cdRef.markForCheck();
                  this.userChangeService.notifyUserChanged();
                },
                (error) => {
                  console.error(
                    "Erro ao obter as informações do usuário:",
                    error
                  );
                }
              );
          },
          (error) => {
            console.error("Erro ao trocar o token:", error);
          }
        );
    }
  }
}
