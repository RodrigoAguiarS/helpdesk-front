import { RegistroPonto } from './../models/RegistroPonto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RelogioService {

  constructor(private http: HttpClient) { }

  registrarPonto(registro: RegistroPonto): Observable<RegistroPonto> {
    return this.http.post<RegistroPonto>(`${API_CONFIG.baseUrl}/api/registrar-ponto`, registro);
  }

  consultarUltimoPonto(): Observable<boolean> {
    return this.http.get<boolean>(`${API_CONFIG.baseUrl}/api/registrar-ponto/is-entrada`);
  }
}
