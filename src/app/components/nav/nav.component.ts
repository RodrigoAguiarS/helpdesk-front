import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserChangeService } from 'src/app/services/user-change-service';
import { Subscription, catchError, switchMap } from 'rxjs';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  roles: string[] = [];
  userChangeSubscription: Subscription;

  constructor(private router: Router,
    private authService: AuthService,
    private mensagemService: MensagemService,
    private userChangeService: UserChangeService) { }

  ngOnInit(): void {
    this.router.navigate(['home']);
    
    this.userChangeSubscription = this.userChangeService.userChanged$.pipe(
      switchMap(() => this.authService.getUserRoles().pipe(
        catchError(error => {
          this.mensagemService.showErrorMensagem(error.error.message);
          return [];
        })
      ))
    ).subscribe((roles: string[]) => {
      this.roles = roles;
    });

    this.authService.getUserRoles().subscribe(
      {
        next: (roles: string[]) => {
          this.roles = roles;
        },
        error: (error) => {
          this.mensagemService.showErrorMensagem(error.error.message);
        }
      }
    );
  }
  
  logout() {
    this.router.navigate(['login']);
    this.authService.logout();
    this.mensagemService.showSuccessoMensagem('Logout realizado com sucesso');
  }

  ngOnDestroy(): void {
    if (this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }
  }
}

