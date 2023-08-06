import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../models/medico';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }

  create(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(`${API_CONFIG.baseUrl}/api/medicos`, medico);
  }

  findAll(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${API_CONFIG.baseUrl}/api/medicos`);
  }

  update(medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${API_CONFIG.baseUrl}/api/medicos/${medico.id}`, medico);
  }

  findById(id: any): Observable<Medico> {
    return this.http.get<Medico>(`${API_CONFIG.baseUrl}/api/medicos/${id}`);
  }

  delete(id: any): Observable<Medico> {
    return this.http.delete<Medico>(`${API_CONFIG.baseUrl}/api/medicos/${id}`);
  }
}
