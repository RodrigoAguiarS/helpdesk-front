import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
}

