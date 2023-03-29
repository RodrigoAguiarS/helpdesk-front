import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
    this.authService.loadPerfil();
  }
  
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
