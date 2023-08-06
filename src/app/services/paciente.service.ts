
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(`${API_CONFIG.baseUrl}/api/pacientes`, paciente);
  }

  findAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${API_CONFIG.baseUrl}/api/pacientes`);
  }

  update(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${API_CONFIG.baseUrl}/api/pacientes/${paciente.id}`, paciente);
  }

  findById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${API_CONFIG.baseUrl}/api/pacientes/${id}`);
  }

  delete(id: any): Observable<Paciente> {
    return this.http.delete<Paciente>(`${API_CONFIG.baseUrl}/api/pacientes/${id}`);
  }
}
