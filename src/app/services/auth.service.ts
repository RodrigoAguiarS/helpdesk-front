import { API_CONFIG } from './../config/api.config';
import { Credenciais } from './../models/credenciais';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RefreshTokenResponse } from '../models/refreshTokenResponse';
import { RefreshTokenRequest } from '../models/refreshTokenRequest';
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

  logout() {
    localStorage.clear();
  }

  getUserRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${API_CONFIG.baseUrl}/api/usuarios/papel`);
  }

  logarComoUsuario(username: string): Observable<string> {
    return this.http.post<string>(`${API_CONFIG.baseUrl}/api/admin/logar-como-usuario`, { username });
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(`${API_CONFIG.baseUrl}/api/admin/refresh-token`, refreshTokenRequest);
  }

  executarAcaoComoUsuario(username: string): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/api/admin/impersonate/${username}`);
  }

  reverterParaUsuarioOriginal(): Observable<any> {
    return this.http.get(`${API_CONFIG.baseUrl}/api/admin/revert-to-original`);
  }

  trocarTokenComNovoUsuario(username: string): Observable<RefreshTokenResponse> {
    const refreshTokenRequest = {
      currentToken: localStorage.getItem('token')
    };
    return this.http.post<RefreshTokenResponse>(`${API_CONFIG.baseUrl}/api/admin/refresh-token?username=${username}`, refreshTokenRequest);
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
}
