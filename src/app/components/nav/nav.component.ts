import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserChangeService } from 'src/app/services/user-change-service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  roles: string[] = [];

  constructor(private router: Router,
    private authService: AuthService,
    private toast: ToastrService,
    private userChangeService: UserChangeService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
    this.authService.getUserRoles().subscribe(
      (roles: string[]) => {
        this.roles = roles;
      },
      (error) => {
        this.toast.error('Ocorreu um erro ao obter as funções do usuário.', error);
      }
    );
    this.userChangeService.userChanged$.subscribe(() => {
      this.router.navigate(['home'])
    this.authService.getUserRoles().subscribe(
      (roles: string[]) => {
        this.roles = roles;
      },
      (error) => {
        this.toast.error('Ocorreu um erro ao obter as funções do usuário.', error);
      }
    );
      console.log('Usuário mudou. Atualizando cabeçalho...');
    });
  }
  
  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 7000})
  }
}
