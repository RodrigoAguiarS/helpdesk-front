import { Injectable } from '@angular/core';
import { Especialidade } from '../models/especialidade';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  constructor(private http: HttpClient) { }

  create(especialidade: Especialidade): Observable<Especialidade> {
    return this.http.post<Especialidade>(`${API_CONFIG.baseUrl}/api/especialidades`, especialidade);
  }

  findAll(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(`${API_CONFIG.baseUrl}/api/especialidades`);
  }

  update(especialidade: Especialidade): Observable<Especialidade> {
    return this.http.put<Especialidade>(`${API_CONFIG.baseUrl}/api/especialidades/${especialidade.id}`, especialidade);
  }

  findById(id: any): Observable<Especialidade> {
    return this.http.get<Especialidade>(`${API_CONFIG.baseUrl}/api/especialidades/${id}`);
  }

  delete(id: any): Observable<Especialidade> {
    return this.http.delete<Especialidade>(`${API_CONFIG.baseUrl}/api/especialidades/${id}`);
  }
}
