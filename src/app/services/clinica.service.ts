import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinica } from '../models/clinica';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService {

  constructor(private http: HttpClient) { }

  create(clinica: Clinica): Observable<Clinica> {
    return this.http.post<Clinica>(`${API_CONFIG.baseUrl}/api/clinicas`, clinica);
  }

  findAll(): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(`${API_CONFIG.baseUrl}/api/clinicas`);
  }
}
