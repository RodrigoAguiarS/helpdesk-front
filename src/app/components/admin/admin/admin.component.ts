import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RefreshTokenResponse } from 'src/app/models/refreshTokenResponse';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usuario: Usuario
  usuarioLogado: Usuario;
  roles: string[] = [];
  loginComoUsuario: string = '';

  login: FormControl = new FormControl(null, Validators.email);

  constructor(
    public authService: AuthService,
    private toast: ToastrService,
    private usuarioService: UsuarioService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.getUserRoles().subscribe(
      (roles: string[]) => {
        this.roles = roles;
      },
      (error) => {
        this.toast.error('Ocorreu um erro ao obter as funções do usuário.', error);
      }
    );
    // Obter informações do usuário logado
    this.usuarioService.obterDadosUsuario().subscribe(
      (usuario: Usuario) => {
        console.log(usuario.email)
        this.usuarioLogado = usuario;
      },
      (error) => {
        console.error('Erro ao obter as informações do usuário logado:', error);
      }
    );
  }
  
  logarComoUsuario(): void {
    if (this.loginComoUsuario) {
        this.authService.logarComoUsuario(this.loginComoUsuario).subscribe(
            response => {
                console.log('Resposta da solicitação de login como usuário:', response);
                this.toast.success('Login como usuário bem-sucedido!');
                
                this.authService.trocarTokenComNovoUsuario(this.loginComoUsuario).subscribe(
                    (refreshTokenResponse: RefreshTokenResponse) => {
                        console.log('Resposta da troca de token:', refreshTokenResponse);
                        localStorage.setItem('token', refreshTokenResponse.newToken);
                        console.log('Token atualizado:', refreshTokenResponse.newToken);

                        // Obter as informações do usuário com base no novo token
                        this.usuarioService.getUserInfo(refreshTokenResponse.newToken).subscribe(
                            (userInfo: Usuario) => {
                                this.usuario = userInfo;
                                this.cdRef.markForCheck();
                            },
                            (error) => {
                                console.error('Erro ao obter as informações do usuário:', error);
                            }
                        );
                    },
                    (error) => {
                        console.error('Erro ao trocar o token:', error);
                    }
                );
            },
            (error) => {
                console.error('Erro ao logar como usuário:', error);
                this.toast.error('Ocorreu um erro ao logar como usuário.', error.message);
            }
        );
    }
  }

  voltarAoUsuarioAnterior(): void {
    if (this.usuarioLogado) {
        this.authService.trocarTokenComNovoUsuario(this.usuarioLogado.email).subscribe(
            (refreshTokenResponse: RefreshTokenResponse) => {
                localStorage.setItem('token', refreshTokenResponse.newToken);
                // Obter as informações do usuário com base no novo token
                this.usuarioService.getUserInfo(refreshTokenResponse.newToken).subscribe(
                    (userInfo: Usuario) => {
                        this.usuario = userInfo;
                        this.cdRef.markForCheck();
                    },
                    (error) => {
                        console.error('Erro ao obter as informações do usuário:', error);
                    }
                );
            },
            (error) => {
                console.error('Erro ao trocar o token:', error);
            }
        );
    }
  }
}