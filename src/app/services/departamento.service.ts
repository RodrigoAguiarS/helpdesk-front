import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from '../models/departamento';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  create(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${API_CONFIG.baseUrl}/api/departamentos`, departamento);
  }

  findAll(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${API_CONFIG.baseUrl}/api/departamentos`);
  }

  findAllDepartamentoSemResponsavel(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${API_CONFIG.baseUrl}/api/departamentos/semReponsavel`);
  }

  update(departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${API_CONFIG.baseUrl}/api/departamentos/${departamento.id}`, departamento);
  }

  findById(id: any): Observable<Departamento> {
    return this.http.get<Departamento>(`${API_CONFIG.baseUrl}/api/departamentos/${id}`);
  }

  delete(id: any): Observable<Departamento> {
    return this.http.delete<Departamento>(`${API_CONFIG.baseUrl}/api/departamentos/${id}`);
  }

  findResponsavelAtualByDepartamento(id: any): Observable<Departamento> {
    return this.http.get<Departamento>(`${API_CONFIG.baseUrl}/api/departamentos/responsavelAtual/${id}`);
  }
}
