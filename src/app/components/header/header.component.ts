import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from './../../models/usuario';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: Usuario
  usuarios: Usuario[] = [];
  usuarioEmVisualizacao: Usuario | null = null;
  selectedUsuario: Usuario | null = null;

  roles: string[] = [];
  isMenuOpen: boolean = false;

  constructor(
    public usuarioService: UsuarioService,
    private authService: AuthService,
    private toast:    ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
    forkJoin([
      this.authService.getUserRoles(),
      this.usuarioService.obterDadosUsuario(),
    ]).subscribe(
      ([roles, usuario]) => {
        this.roles = roles;
        this.usuario = usuario;
      },
      (error) => {
        this.toast.error('Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.', 'Erro');
      }
    );
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 7000})
  }

  carregarUsuarios(): void {
    this.usuarioService.carregarUsuarios().subscribe(
      usuarios => this.usuarios = usuarios,
      error => console.error(error)
    );
  }

  alternarParaUsuario(): void {
    if (this.selectedUsuario) {
      this.usuarioService.alternarParaUsuario(this.selectedUsuario).subscribe(
        usuarioAlternado => this.usuarioEmVisualizacao = usuarioAlternado,
        error => console.error(error)
      );
    }
  }

  voltarParaAdmin(): void {
    this.usuarioEmVisualizacao = null;
  }
}
