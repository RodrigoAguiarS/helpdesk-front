import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UserChangeService } from 'src/app/services/user-change-service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
    private userChangeService: UserChangeService) { }

  ngOnInit(): void {
    this.buscarDadosUsuario();
    this.userChangeService.userChanged$.subscribe(() => {
      this.buscarDadosUsuario();
    });
  }

  private buscarDadosUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe((dadosUsuario) => {
      this.usuario = dadosUsuario;
    });
  }
}
