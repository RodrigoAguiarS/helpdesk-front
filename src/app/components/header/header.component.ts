import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toast:    ToastrService,) { }

  ngOnInit(): void {
    this.authService.loadName();
    this.authService.loadPerfil();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isNome(): string {
    return this.authService.getName();
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 7000})
  }
}
