import { API_CONFIG } from './../config/api.config';
import { Credenciais } from './../models/credenciais';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Email } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient ) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    })
  }

  sucessFulLogin(authtoken: string) {
    localStorage.setItem('token', authtoken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  recuperarSenha(email: string): Observable<string> {
    const request: Email = { email: email };
    return this.http.post<string>(`${API_CONFIG.baseUrl}/api/login-alterar`, request);
  }

  atualizarSenha(uid: string, novaSenha: string): Observable<string> {
    const request = {
      uid: uid,
      senha: novaSenha
    };
    return this.http.post<string>(`${API_CONFIG.baseUrl}/api/login-alterar/${uid}`, request);
  }

  verificarUid(uid: string): Observable<string> {
    return this.http.get(`${API_CONFIG.baseUrl}/api/login-alterar/${uid}`, { responseType: 'text' });
  }

  logout() {
    localStorage.clear();
  }
}
