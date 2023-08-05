import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  tecnico: Tecnico;

  isAdm: boolean;

  constructor(private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
    public tecnicoService: TecnicoService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
    this.verificarPerfilAdm();
    this.tecnicoService.ObterDadosUsuario().subscribe(
      (tecnico: Tecnico) => {
        this.tecnico = tecnico;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 7000})
  }
  
  verificarPerfilAdm(): void {
    this.tecnicoService.verificarPerfilAdm().subscribe(
      (isAdm: boolean) => {
        this.isAdm = isAdm;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}