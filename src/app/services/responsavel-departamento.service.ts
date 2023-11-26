import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsavelDepartamento } from '../models/responsavelDepartamento';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelDepartamentoService {

  constructor(private http: HttpClient) { }

  create(responsavelDepartamento: ResponsavelDepartamento): Observable<ResponsavelDepartamento> {
    return this.http.post<ResponsavelDepartamento>(`${API_CONFIG.baseUrl}/api/responsavel_departamento/vincular`, responsavelDepartamento);
  }

  findAll(): Observable<ResponsavelDepartamento[]> {
    return this.http.get<ResponsavelDepartamento[]>(`${API_CONFIG.baseUrl}/api/responsavel_departamento`);
  }

  update(responsavelDepartamento: ResponsavelDepartamento): Observable<ResponsavelDepartamento> {
    return this.http.put<ResponsavelDepartamento>(`${API_CONFIG.baseUrl}/api/responsavel_departamento/${responsavelDepartamento.id}`, responsavelDepartamento);
  }

  findById(id: any): Observable<ResponsavelDepartamento> {
    return this.http.get<ResponsavelDepartamento>(`${API_CONFIG.baseUrl}/api/responsavel_departamento/responsaveis/${id}`);
  }

  delete(id: any): Observable<ResponsavelDepartamento> {
    return this.http.delete<ResponsavelDepartamento>(`${API_CONFIG.baseUrl}/api/responsavel_departamento/${id}`);
  }
}
