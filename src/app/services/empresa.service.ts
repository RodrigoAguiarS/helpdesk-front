import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  ObterDadosEmpresa(): Observable<Empresa> {
    return this.http.get<Empresa>(`${API_CONFIG.baseUrl}/api/empresas/dados`);
  }
}
